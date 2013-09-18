
/*!
 * pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var pencil = require('../pencil')
  , nando = require('../../../nando/lib2/nando')
  , util = require('./utils')
  , path = require('path')
  ;

/**
 * Expose.
 *
 * @api public
 */

var Namespace = module.exports = {

  dependencies: [],
  
  namespaces: {},

  map: {},
    
  /**
   * get.
   *
   * @api public
   */

  get: function (name) {
    return Namespace.map[name];
  },

  /**
   * set.
   *
   * @api public
   */

  set: function (directory) {
    if(directory && ~Namespace.dependencies.indexOf(directory)){
      return null;
    }

    // register directory as dependency
    Namespace.dependencies.push(directory);

    var conf = require(path.join(directory, 'namespace'))
      , prefix = conf.prefix = conf.prefix || path.basename(directory)
      , tags = conf.tags || {}
      ;

    // register the prefix in nando.class
    nando.class.namespace(prefix, directory);

    Namespace.map[prefix] = prefix;

    if (conf.default) {
      Namespace.map['default'] = prefix;
    }
    
    if (conf.alias) {
      Namespace.map[conf.alias] = prefix;
    }

    // dependencies
    if (conf.dependencies) {
      conf.dependencies.forEach(function (dep) {
        pencil.use(dep);
      });
    };

    conf.directory = conf.directory || directory;

    Namespace.namespaces[prefix] = conf = util.merge(
      Namespace.namespaces[prefix] || {},
      conf
    );

    if (!conf.tagexps) {
      conf.tagexps = [];
    }
    
    util.forEach(tags, function (opts, name) {
      if (opts.template) {
        opts.template = opts.template ? path.join(conf.directory, opts.template) : null;
      }

      registerTag(conf, name, opts);
    });

  }


};


/**
 * registerTag.
 *
 * @api public
 */

function registerTag (conf, name, opts) {
  opts = opts || {};

  var validations = []
    ;

  // self define template
  if (opts.template) {
    pencil.define(conf.prefix + '.' + name, {
      extend: 'pencil.template',
      template: opts.template
    });
  };

  // onlyParent
  if (opts.onlyParent && opts.onlyParent.length > 0) {
    // validations.push(function (name, params, node) {
    //   if (node && node.parent) {
    //     return ~opts.onlyParent.indexOf(node.parent.tagName);
    //   }
    //   return false;
    // });
  }


  conf.tagexps.push(registerTagexp(conf, name.replace(/\./g, ':'), name, validations));

  util.forEach(opts.alias, function (alias) {
    conf.tagexps.push(registerTagexp(conf, alias, name, validations));
  });    
};


/**
 * registerTagexp.
 *
 * @api private
 */

function registerTagexp (conf, tagexp, name, validations) {
  var htmlMatch = null
    , tag = null
    ;

  // Check if if any Tagexp was previously registered
  // for (var i = 0; i < tagexps.length; i++) {
  //   if (tagexps[i].tagexp == tagexp && tagexps[i].name == name) {
  //     return null;
  //   }
  // };

  // remove existing html tags
  if (conf.default && ~(htmlMatch = pencil.htmlTags.indexOf(tagexp))) {
    pencil.htmlTags.splice(htmlMatch, 1);
  }
  
  // tagexp to regexp
  tag = new pencil.Tagexp(tagexp, {});
  tag.name = name;
  
  tag.validations = tag.validations.concat(validations);

  return tag;
};