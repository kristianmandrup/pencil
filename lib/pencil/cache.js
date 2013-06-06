
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
  , utils = require('./utils')
  , htmlTags = require('./html-tags')
  ;

/**
 * Expose.
 *
 * @api public
 */

exports = module.exports = {

  mixins: {},

  dependencies: [],

  htmlTags: htmlTags,
  
  namespaces: {},
  namespacesAlias: {},
  
  tagexps: [],
  
  tags: {},
  
  templates: {},

  /**
   * getTag.
   *
   * @api public
   */

  getTag: function (name) {
    return exports.tags[name];
  },

  /**
   * setTag.
   *
   * @api public
   */

  setTag: function (name, value) {
    return exports.tags[name] = value;
  },

  /**
   * getNamespace.
   *
   * @api public
   */

  getNamespace: function (name) {
    return exports.namespaces[exports.namespacesAlias[name] || name];
  },

  /**
   * setNamespace.
   *
   * @api public
   */

  setNamespace: function (directory) {
    if(directory && ~exports.dependencies.indexOf(directory)){
      return exports;
    }

    var nss = exports.namespaces
      , conf
      , prefix = path.basename(directory)
      , tags
      ;

    // register directory as dependency
    exports.dependencies.push(directory);
    
    namespace = path.join(directory, 'namespace');

    try{
      // namespace

      conf = require(namespace);

      // dependencies
      if (conf.dependencies && conf.dependencies.length > 0) {
        conf.dependencies.forEach(function (dep) {
          pencil.use(dep);
        });
      };

      prefix = conf.prefix || prefix;
      tags = conf.tags = conf.tags || {};

      conf.directory = conf.directory || directory;
      
      nss[prefix] = utils.extend(
        nss[prefix] || {},
        conf
      );
      
      if (conf.default) {
        nss.default = prefix;
      }
      
      if (conf.alias) {
        exports.namespacesAlias[conf.alias] = prefix;
      }

      // register tagexps
      Object.keys(tags).forEach(function (name) {
        exports.registerTag({
          name: name,
          prefix: prefix,
          prefixAlias: conf.alias,
          template: tags[name].template ? path.join(conf.directory, tags[name].template) : null,
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

      nss[prefix] = utils.extend(
        nss[prefix] || {},
        conf
      );
    }

  },

  /**
   * registerTag.
   *
   * @api public
   */

  registerTag: function (options) {
    options = options || {};

    var name = options.name
      , alias = options.alias
      , isDefault = options.default
      , parts = name.split('.')
      , prefix = parts.shift()
      , prefixAlias = options.prefixAlias
      , validations = []
      ;

    // self define template
    if (options.template) {
      pencil.define(name, {
        render: function () {
          this.template(options.template, this.data(), false);

          // TODO: would be better to return something like this
          // return this.template(options.template, this.data(), false).callParent(arguments);
          // BUT without the replaceWith in the function, just the mixin/ast from the template
          // probably need new function in Helper:
          // problem: but how to cache the new mixin ?
          // MAYBE NOT !!

          return this.callParent(arguments);
        }
      });
    };

    // onlyParent
    if (options.onlyParent && options.onlyParent.length > 0) {
      validations.push(function (name, params, node) {
        if (node && node.parent) {
          return ~options.onlyParent.indexOf(node.parent.tagName);
        }
        return false;
      });
    }

    exports.registerTagexp(name.replace(/\./g, ':'), name, validations);
    if (isDefault) {
      exports.registerTagexp(parts.join(':'), name, validations);
    }
    
    if (alias) {
      for (var i = 0; i < alias.length; i++) {
        exports.registerTagexp(prefix + ':' + alias[i], name, validations);
        if (isDefault) {
          exports.registerTagexp(alias[i], name, validations);
        }
      }
    }
  },

  /**
   * registerTagexp.
   *
   * @api private
   */

  registerTagexp: function (tagexp, name, validations) {
    var tagexps = exports.tagexps
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
    if (~(htmlMatch = exports.htmlTags.indexOf(tagexp))) {
      exports.htmlTags.splice(htmlMatch, 1);
    }
    
    // tagexp to regexp
    tag = new pencil.Tagexp(tagexp, {});
    tag.name = name;
    
    tag.validations = tag.validations.concat(validations);

    tagexps.push(tag);

    return tag;
  }

};