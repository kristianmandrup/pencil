
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
  util.inherits(target, ('string' === typeof origin)
    ? origin = pencil.tag(origin)
    : origin
  );

  if ('function' === typeof origin.extend) {
    target.extend = origin.extend;
  }

  return target;
};

/**
 * extend.
 *
 * @api public
 */

pencil.extend = function () {
  if (arguments.length == 0) {
    return pencil.nodes.Custom;
  }

  var Tag
    , args = Array.prototype.slice.call(arguments, 0)
    , first = args.shift()
    ;

  if ('string' === typeof first) {
    Tag = pencil.tag(first);
  }
  else if (first.isTag) {
    Tag = first;
  }
  else {
    Tag = pencil.nodes.Custom.extend(first);
  }

  return args.length > 0 ? Tag.extend.apply(Tag, args) : Tag;
};

/**
 * Expose custom nodes extending `Jade`.
 */

['Tag', 'Custom', 'Component', 'Container']

.forEach(function (node) {
  cache.tags['pencil.' + node.toLowerCase()] = 
  pencil.nodes[node] = require('./pencil/nodes/' + node.toLowerCase());
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
  var parts = name.split('.')
    , nss = cache.namespaces
    , ns
    , found
    ;

  // cached
  if (cache.tags[name]) {
    return cache.tags[name];
  }

  // namespace & alias
  ns = (parts.length === 1 || (!nss[parts[0]] && !cache.alias[parts[0]]))
    ? 'default'
    : parts.shift();

  ns = nss[cache.alias[ns] || ns];
  
  // Look for a file that should contain the Tag definition.
  // ******
  // ****** TODO: WHAT IF THERE IS NO DIRECTORY ? `pencil.root` ??
  // ****** maybe the root could be a namespace ??
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
  if (cache.tags[name]) {
    return cache.tags[name];
  }

  if (found) {
    return cache.tags[name] = found;
  }

  return null;
};

/**
 * namespace.
 *
 * @api public
 */

pencil.namespace = function namespace (directory, isDefault) {
  var args = Array.prototype.slice.call(arguments, 0);

  for (var i = 0; i < args.length; i++) {
    cache.registerNamespace(args[i]);
  }
  
  return pencil;
};

/**
 * use.
 *
 * @api public
 */

pencil.use = function use (directory, isDefault) {
  var args = Array.prototype.slice.call(arguments, 0);

  for (var i = 0; i < args.length; i++) {
    if ('default' == args[i]) {
      cache.registerNamespace(
        args[i] = path.join(__dirname, '../namespaces/pencil')
      );
    }
    else {
      try {
        cache.registerNamespace(require(args[i]).namespace);
      } catch(err) {
        console.log(err)
      };
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

  var node
    , src
    , args = Array.prototype.slice.call(arguments, 1)
    , check
    , custom
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

  if (!parent && src) {
    parent = src.parent;
  }

  params = params || {};

  if (~cache.htmlTags.indexOf(name)) {
    node = src || new pencil.nodes.Tag(name, block);
  }
  else {

    for (var i = 0; i < cache.tagexps.length; i++) {
      check = cache.tagexps[i];

      if (check.match(name, params)) {
        custom = check.name;
        break;
      }
    };

  }

  if (!custom) {
    if (!node && (custom = pencil.tag(name.replace(':', '.')))) {
      // custom tag
      node = new (custom)(src || name, params);
    }
    else {
      // html tag
      node = node || src || new pencil.nodes.Tag(name, block);
      node.attr(params);
    }
  }
  else if (custom) {
    // custom tag
    custom = pencil.tag(custom);
    node = custom ? new (custom)(src || name, params) : src;
  }

  if (parent) {
    node.parent = parent;
    node.state = parent.state;
  }

  if (src) {
    node.realParent = src.realParent;
  }

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
  cache.registerTag(name, props.alias, !!props.default, null);

  delete props.extend;
  delete props.alias;
  delete props.default;

  if ('string' === typeof Base) {
    Base = pencil.tag(Base);
  }

  Tag = Base.extend(props);

  return cache.tags[name] = Tag;
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
    ;

  options = options || {};
  options.layout = false;

  if (tmpls[file]) {
    parsed = tmpls[file];
  }
  else {
    parsed = tmpls[file] = new pencil.Parser(
      fs.readFileSync(file, 'utf8'),
      file,
      {}
    );
  }

  parsed.options = options;

  return parsed.parse();
};