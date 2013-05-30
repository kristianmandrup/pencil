
/*!
 * pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var path = require('path')
  , util = require('util')
  , utils = require('./pencil/utils')
  , fs = require('fs')
  , jade = require('jade')
  , cache
  ;

//
// Huge thanks to Jade !
// https://github.com/visionmedia/jade
//

var pencil = module.exports = util._extend({}, jade);

/**
 * Expose `version`.
 *
 * @api public
 */

pencil.version = require('../package').version;

/**
 * Expose `Tagexp`.
 */

pencil.Tagexp = require('./pencil/tagexp');

/**
 * Expose `Compiler`.
 */

pencil.Compiler = require('./pencil/compiler');

/**
 * Expose `Parser`.
 */

pencil.Parser = require('./pencil/parser');

/**
 * Helper.
 *
 * @api public
 */

pencil.Helper = require('./pencil/helper');

/**
 * Expose `htmlTags`.
 */

pencil.htmlTags = require('./pencil/html-tags');

/**
 * cache.
 *
 * @api public
 */

pencil.cache = cache = require('./pencil/cache');

/**
 * inherits.
 *
 * @api public
 */

pencil.inherits = function inherits (target, origin) {
  util.inherits(target, 'string' === typeof origin
    ? origin = pencil.tag(origin)
    : origin
  );

  if ('function' === typeof origin.extend) {
    target.extend = origin.extend;
  }

  return target;
};

/**
 * compile / render / renderFile.
 *
 * @api public
 */

['compile', 'render', 'renderFile']

.forEach(function (name) {
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

    return jade[name].apply(this, arguments);
  };
});

/**
 * Express support.
 */

pencil.__express = pencil.renderFile;

/**
 * extend.
 *
 * @api public
 */

pencil.extend = pencil.Helper.extend;

/**
 * Expose custom nodes extending `Jade`.
 */

jade.nodes._Tag = jade.nodes.Tag;

['Tag', 'Custom', 'Component', 'Container']

.forEach(function (node) {
  var name = node.toLowerCase()
    , file = './pencil/nodes/' + name
    , tagName = 'pencil.' + name
    , get = function () {
        delete pencil.nodes[node];
        delete cache.tags[tagName];
        return pencil.nodes[node] = cache.tags[tagName] = require(file);
      }
    ;

  pencil.nodes.__defineGetter__(node, get);
  cache.tags.__defineGetter__(tagName, get);
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
 * tid.
 *
 * @api public
 */

pencil.tid = function () {
  return ++pencil.tid.current;
};

pencil.tid.current = 0;

/**
 * tag.
 *
 * @api public
 */

pencil.tag = function tag (name) {
  // cached
  if (cache.getTag(name)) {
    return cache.getTag(name);
  }

  var parts = name.split('.')
    , prefix = parts.shift()
    , found
    , ns
    ;

  // namespace & alias
  if (parts.length === 0 || !(ns = cache.getNamespace(prefix))) {
    ns = cache.getNamespace('default');
  }

  if (ns && prefix !== ns.prefix) {
    name = [prefix = ns.prefix].concat(parts).join('.');
  }


  // Look for a file that should contain the Tag definition.
  // ******
  // ****** TODO: WHAT IF THERE IS NO DIRECTORY ? `pencil.root` ??
  // ****** maybe the root could be a namespace ??
  if (cache.getTag(name)) {
    return cache.getTag(name);
  }

  try {
    found = require(path.join(
      ns && ns.directory,
      parts.join('/')
    ));
  }
  catch (e) {
    // go ahead
  }

  // The required file may not return any object and
  // it could use instead the `jade.define` function inside.
  // So we first check if the Tag has already been cached.
  if (cache.getTag(name)) {
    return cache.getTag(name);
  }

  if (found) {

    found.tagName = name;

    return cache.setTag(name, found);
  }

  return null;
};

/**
 * namespace.
 *
 * @api public
 */

pencil.namespace = function namespace (directory, isDefault) {
  var args = utils.slice(arguments);

  for (var i = 0; i < args.length; i++) {
    cache.setNamespace(args[i]);
  }
  
  return pencil;
};

/**
 * use.
 *
 * @api public
 */

pencil.use = function use (directory, isDefault) {
  var args = utils.slice(arguments);

  for (var i = 0; i < args.length; i++) {
    if ('default' == args[i]) {
      cache.setNamespace(
        args[i] = path.join(__dirname, '../namespaces/pencil')
      );
    }
    else {
      cache.setNamespace(require(args[i]).namespace);
    }
  }
  
  return pencil;
};

/**
 * create.
 *
 * @api public
 */

pencil.create = function create (name) {
  if (!name) {
    return new pencil.nodes.Tag('div');
  }
  else if (pencil.isCustom(name)) {
    return name;
  }

  var node
    , src
    , parts
    , prefix
    , ns
    , args = utils.slice(arguments, 1)
    , check
    , custom
    , customMatch = false
    , block
    , params
    , parent
    ;

  // retrieve block or params
  args.forEach(function (arg) {
    if (pencil.isBlock(arg) || Array.isArray(arg)) {
      block = arg;
    }
    else if (pencil.isTag(arg)) {
      parent = arg;
    }
    else {
      params = arg;
    }
  });

  if (pencil.isTag(name)) {
    src = name;
    name = src.name;
  }
  else if ('string' !== typeof name) {
    params = name;
    name = 'div';
  }

  params = params || {};

  if (~cache.htmlTags.indexOf(name)) {
    node = src || new pencil.nodes.Tag(name, block);
  }
  else {

    // replace the "alias prefix"
    parts = name.split(':');
    prefix = parts.shift();
    ns = cache.getNamespace(prefix);

    if (ns && prefix !== ns.prefix) {
      name = [prefix = ns.prefix].concat(parts).join(':');

      if (src && src.name) {
        src.name = name;
      }
    }

    for (var i = 0; i < cache.tagexps.length; i++) {
      check = cache.tagexps[i];

      for (var x = 0; x < check.validations.length; x++) {
        if (!check.validations[x](name, params, src)) {          
          break;
        }
        customMatch = true;
      };

      if (x == check.validations.length) {
        custom = check.name;
        break;
      }
    };

  }

  if (!custom) {
    if (!node && !customMatch && (custom = pencil.tag(name.replace(':', '.')))) {
      // custom tag
      console.log(src.name)
      node = new (custom)(src || name, params);
    }
    else {
      // html tag
      node = node || src || new pencil.nodes.Tag(name, block);
      !customMatch && node.attr(params);
    }
  }
  else if (custom) {
    // custom tag
    custom = pencil.tag(custom);
    node = custom ? new (custom)(src || name, params) : src;
  }

  if (!parent && src) {
    parent = src.parent;
  }

  if (parent) {
    node.parent = parent;
    node.state = parent.state;
  }

  if (src) {
    node.realParent = src.realParent;
  }

  node.tagName = custom ? custom.tagName : name;
  
  return node;
};

/**
 * define.
 *
 * @api public
 */

pencil.define = function define (name, props) {
  if (arguments.length < 2) {
    throw new Error('Not enough parameters.')
  }

  var parts = name.split('.')
    , prefix = parts.shift()
    , Base = props.extend || pencil.nodes.Custom
    , Tag
    ;
  
  // Register the tag
  cache.registerTag({
    name: name,
    prefix: prefix,
    default: !!props.default,
    alias: props.alias
  });

  delete props.extend;
  delete props.alias;
  delete props.default;

  if ('string' === typeof Base) {
    Base = pencil.tag(Base);
  }

  Tag = Base.extend(props);

  return cache.setTag(name, Tag);
};

/**
 * walkThrough.
 *
 * @api public
 */

pencil.walkThrough = function (node, ret, filter, parent) {
  var fn;

  if ('function' !== typeof ret) {
    fn = function (node) {
      ret.push(node);
    }
  }
  else {
    fn = ret;
  }

  if (!parent) {
    parent = node;
  }

  if (pencil.isBlock(node)) {
    // block
    for (var i = 0; i < node.nodes.length; i++) {
      if (pencil.isTag(node.nodes[i])) {
        if (filter && !filter(node.nodes[i])) {
          continue;
        }
        fn(node.nodes[i], node.nodes, i);

        if (!node.nodes[i] || !node.nodes[i].isRendered) {
          // In case the tag gets removed by this.remove() the loop
          // has to roll back to parse the tag that took it's place
          --i;
        }
      }
      else {
        pencil.walkThrough(node.nodes[i], fn, filter, parent || node);
      }    
    };
  }
  else if (
       pencil.isTag(node)
    || pencil.isCustom(node)
  ) {
    // tag
    fn(node);
  }
  else if (
       pencil.isNode(node)
    || pencil.isEach(node)
    || pencil.isCode(node)
    || pencil.isCase(node)
  ) {
    // node / each / code / case
    node.block && pencil.walkThrough(node.block, fn, filter, parent || node);
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

  return ret;
};

/**
 * template.
 *
 * @api public
 */

pencil.template = function (file, options) {
  var tmpls = cache.templates
    , parsed
    , ast
    ;

  options = options || {};
  options.layout = false;

  parsed = new pencil.Parser(
    tmpls[file] || (tmpls[file] = fs.readFileSync(file, 'utf8')),
    file,
    {}
  );

  parsed.options = options;

  ast = parsed.parse();
  ast.filename = file;

  return ast;
};


