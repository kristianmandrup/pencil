
/*!
 * pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var pencil = require('../pencil')
  , path = require('path')
  , util = require('util')
  , htmlTags = require('./html-tags')
  ;

/**
 * Expose `Cache`.
 *
 * @api public
 */

var Cache = exports = module.exports = {

  htmlTags: htmlTags,
  
  alias: {},
  
  namespaces: {},
  
  tagexps: [],
  
  tags: {},
  
  templates: {}

};

/**
 * registerNamespace.
 *
 * @api public
 */

Cache.registerNamespace = function registerNamespace (directory) {
  var nss = Cache.namespaces
    , conf
    , prefix = path.basename(directory)
    , tags
    ;

  namespace = path.join(directory, 'namespace');

  try{
    // namespace

    conf = require(namespace);

    prefix = conf.prefix || prefix;
    tags = conf.tags = conf.tags || {};

    conf.directory = conf.directory || directory;
    
    nss[prefix] = util._extend(
      nss[prefix] || {},
      conf
    );
    
    if (conf.default) {
      nss.default = prefix;
    }
    
    if (conf.alias) {
      Cache.alias[conf.alias] = prefix;
    }

    // register tagexps
    Object.keys(tags).forEach(function (name) {
      Cache.registerTag({
        name: name,
        prefix: prefix,
        prefixAlias: conf.alias,
        default: !!conf.default,
        alias: tags[name].alias,
        onlyParent: tags[name].onlyParent
      });
    });

  } catch(e) {
    // directory

    conf = {};
    conf.prefix = prefix;
    conf.directory = directory;

    nss[prefix] = util._extend(
      nss[prefix] || {},
      conf
    );
  }

};

/**
 * registerTag.
 *
 * @api public
 */

Cache.registerTag = function (options) {
  options = options || {};

  var name = options.name
    , alias = options.alias
    , isDefault = options.default
    , parts = name.split('.')
    , prefix = parts.shift()
    , prefixAlias = options.prefixAlias
    , validations = []
    ;

  if (options.onlyParent && options.onlyParent.length > 0) {
    validations.push(function (name, params, node) {
      if (node && node.parent) {
        return ~options.onlyParent.indexOf(node.parent.tagName);
      }
      return false;
    });
  }

  Cache.registerTagexp(name.replace(/\./g, ':'), name, validations);
  if (prefixAlias) {
    Cache.registerTagexp(prefixAlias + ':' + parts.join(':'), name, validations);
  }
  if (isDefault) {
    Cache.registerTagexp(parts.join(':'), name, validations);
  }
  
  if (alias) {
    for (var i = 0; i < alias.length; i++) {
      Cache.registerTagexp(prefix + ':' + alias[i], name, validations);
      if (prefixAlias) {
        Cache.registerTagexp(prefixAlias + ':' + alias[i], name, validations);
      }
      if (isDefault) {
        Cache.registerTagexp(alias[i], name, validations);
      }
    }
  }
}

/**
 * registerTagexp.
 *
 * @api private
 */

Cache.registerTagexp = function registerTagexp (tagexp, name, validations) {
  var tagexps = Cache.tagexps
    , htmlMatch
    , tag
    ;

  // Check if if any Tagexp was previously registered
  for (var i = 0; i < tagexps.length; i++) {
    if (tagexps[i].tagexp == tagexp && tagexps[i].name == name) {
      return null;
    }
  };

  // remove existing html tags
  if (~(htmlMatch = Cache.htmlTags.indexOf(tagexp))) {
    Cache.htmlTags.splice(htmlMatch, 1);
  }
  
  // tagexp to regexp
  tag = new pencil.Tagexp(tagexp, {});
  tag.name = name;
  
  tag.validations = tag.validations.concat(validations);

  tagexps.push(tag);

  return tag;
};