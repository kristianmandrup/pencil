
/*!
 * pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var path = require('path')
  , util = require('./pencil/utils')
  , nando = require('../../nando/lib2/nando')
  , fs = require('fs')
  , jade = require('jade')
  , noConflict = {}
  , namespace = null
  , tags = {} // cache for known tags
  , templates = {} // cache for known tags
  ;

//
// Thanks Jade !!!
// https://github.com/visionmedia/jade
//

var pencil = module.exports = jade;

/**
 * Expose `version`.
 *
 * @api public
 */

pencil.version = require('../package').version;

/**
 * Expose `htmlTags`.
 */

pencil.htmlTags = require('./pencil/html-tags');

/**
 * Expose `Tagexp`.
 */

pencil.Tagexp = require('./pencil/tagexp');

/**
 * Expose `Parser`.
 */

pencil.Parser = require('./pencil/parser');

/**
 * namespace.
 *
 * @api public
 */

pencil.namespace = namespace = require('./pencil/namespace');

/**
 * define.
 *
 * @api public
 */

pencil.define = nando.define;

/**
 * compile / render / renderFile.
 *
 * @api public
 */

['compile', 'render', 'renderFile']

.forEach(function (name) {

  noConflict[name] = pencil[name];

  pencil[name] = function (content, options) {

    if (!options.parser) {
      options.parser = pencil.Parser;
    }

    if (!options.compiler) {
      options.compiler = pencil.Compiler;
    }

    options.pretty = true;
    options.compile = true;
    options.compileDebug = true;

    return noConflict[name].apply(this, arguments);
  };
});

/**
 * Express support.
 */

pencil.__express = pencil.renderFile;

/**
 * Expose custom nodes extending `Jade`.
 */

['Tag', 'Custom']

.forEach(function (name) {
  pencil.nodes[name] = require('./pencil/nodes/' + name.toLowerCase());
});

/**
 * Expose `is..`.
 */

Object.keys(pencil.nodes).forEach(function (name) {
  pencil['is' + name] = function (node) {
    return node instanceof pencil.nodes[name];
  }
});

/**
 * resolve.
 *
 * @api public
 */

pencil.resolve = function (name) {
  var tag = tags[name]
    , parts = null
    , prefix = null
    , ns = null
    , params = {}
    , customMatch = null
    , testName = null
    ;
// console.log(name);
  // cached
  if (tag) {
    return tag;
  }

  if (~pencil.htmlTags.indexOf(name)) {
    tag = pencil.nodes.Tag;
  }


  if (!tag) {

    parts = name.split(':');
    prefix = parts.length > 1 ? parts.shift() : 'default';
    ns = namespace.map[prefix];

    if (!ns) {
      ns = namespace.map['default'];
      parts.unshift(prefix);
    }

    if (!ns) {
      tag = pencil.nodes.Tag;
    }
    else {

      prefix = ns;

      // parts.unshift(prefix);
      ns = namespace.namespaces[prefix];

      //console.log('---', prefix,  parts.join(':'));

      params = params || {};
      testName = parts.join(':');

      util.forEach(ns.tagexps, function (check) {
        for (var x = 0; x < check.validations.length; x++) {
          if (!check.validations[x](testName, params)) {          
            break;
          }
        };

        if (x == check.validations.length) {
          customMatch = check.name;
          return false;
        }
      });       

      if (customMatch) {
        // console.log(params);
        tag = nando.class.getClass(prefix + '.' + customMatch);
      }
      
    }

  }

  if (!tag) {
    tag = pencil.nodes.Tag;
  }

  return tags[name] = {
    tag: tag,
    params: params
  };
};

/**
 * namespace.
 *
 * @api public
 */

pencil.use = function (directory) {
  for (var i = 0; i < arguments.length; i++) {
    if ('default' == arguments[i]) {
      namespace.set(path.join(__dirname, '../namespaces/pencil'));
    }
    else if (util.isPath(arguments[i])) {
      // namespace
      namespace.set(arguments[i]);
    }
    else {
      // vendore
      namespace.set(require(arguments[i]).namespace);
    }
  }
  
  return pencil;
};


/**
 * tid.
 *
 * @api public
 */

pencil.tid = function () {
  return ++pencil.tid.current;
};

pencil.tid.current = 0;


/**
 * create.
 *
 * @api public
 */

pencil.create = function create (name) {
  if (!name) {
    return new pencil.nodes.Tag('div');
  }
  else if (pencil.isTag(name)) {
    return name;
  }

  var args = util.slice(arguments, 1)
    , block = null
    , parent = null
    , attrs = null
    , tag = null
    , params = null
    ;

  // retrieve block or attrs
  args.forEach(function (arg) {
    if (pencil.isBlock(arg) || Array.isArray(arg)) {
      block = arg;
    }
    else if (pencil.isTag(arg)) {
      parent = arg;
    }
    else if ('string' !== typeof arg) {
      attrs = arg;
    }
  });

  if ('string' !== typeof name) {
    name = 'div';
  }

  tag = pencil.resolve(name);
  params = tag.params;
  tag = tag.tag;

  attrs = attrs || {};

  tag = new tag(name, block, params, null);

  if (parent) {
    tag.parent = parent;
    tag.state = parent.state;
  }
  
  return tag;
};


/**
 * template.
 *
 * @api public
 */

pencil.template = function (file, options) {
  var parser
    , ast
    ;

  options = options || {};
  options.layout = false;

  var str = fs.readFileSync(file, 'utf8');
  var parser = new pencil.Parser(str, file, this.options);
  parser.blocks = util.merge({}, this.blocks);

  parser.mixins = this.mixins;

  this.context(parser);
  var ast = parser.parse();
  this.context();
  ast.filename = file;

  if ('indent' == this.peek().type) {
    ast.includeBlock().push(this.block());
  }

  return ast;

  // parser = new pencil.Parser(
  //   templates[file] || (templates[file] = fs.readFileSync(file, 'utf8')),
  //   file,
  //   {}
  // );

  // parser.options = options;

  // ast = parser.parse();
  // ast.filename = file;

  return ast;
};


/**
 * loopTags.
 *
 * @api public
 */

pencil.loopTags = function (node, fn) {
  if (pencil.isBlock(node)) {
    // block
    for (var i = 0; i < node.nodes.length; i++) {
      pencil.loopTags(node.nodes[i], fn);   
    };
  }
  else if (
       pencil.isTag(node)
    || pencil.isCustom(node)
  ) {
    // tag
    fn(node);
    pencil.loopTags(node.block, fn);
  }
  else if (
       pencil.isNode(node)
    || pencil.isEach(node)
    || pencil.isCode(node)
    || pencil.isCase(node)
  ) {
    // node / each / code / case
    node.block && pencil.loopTags(node.block, fn);
  }
  //else if (pencil.isMixin(node)) {}
  //else if (pencil.isDoctype(node)) {}
  //else if (pencil.isFilter(node)) {}
  //else if (pencil.isText(node)) {}
  //else if (pencil.isLiteral(node)) {}
  //else if (pencil.isComment(node)) {}
  //else if (pencil.isBlockComment(node)) {}
  else {
    // none
    console.log('EE 1');
  }
};