
/*!
 * pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var pencil = require('../../pencil')
  , utils = require('../utils')
  , Base = pencil.nodes.Tag
  , carries = ['selfClosing', 'line', 'textOnly', 'code']
  , initializing = false
  , fnMatch = /xyz/.test(function () {xyz;}) ? /\bcallParent\b/ : /.*/
  ;

/**
 * Expose `Custom`.
 *
 * @api public
 */

var Custom = module.exports = function Tag (name) {
  if (!initializing && this.init) {
    this.init.apply(this, arguments);
  }
};

Custom.isTag = true;

// Extends from `jade.nodes.Tag`

pencil.inherits(Custom, Base);

/**
 * render.
 *
 * @api public
 */

Custom.prototype.init = function (node, params) {

  if ('string' === typeof node) {
    Custom.super_.call(this, node);
  }
  else {

    Custom.super_.call(this, node.name, node.block);
    this.attrs = node.attrs;

    carries.forEach(function (name) {
      this[name] = node[name];
    }, this);
  }
  
  //this.name = 'custom';

  params = params || {};

  this.params = this.params
    ? utils.extend(this.params, params)
    : params;

};

/**
 * Custom flag.
 *
 * @api public
 */

Custom.prototype.isCustom = true;

/**
 * extend.
 *
 * @api public
 */

Custom.extend = function () {
  var callParent = this.prototype
    , prototype
    , prop
    , args = Array.prototype.slice.call(arguments, 0)
    , first = args.shift()
    , tag
    ;
  
  if ('string' === typeof first) {
    first = pencil.tag(first).prototype;
  }
  else if (first.isTag) {
    first = first.prototype;
  }
  else if (first.extend) {
    tag = first.extend;
    delete first.extend;

    tag = 'function' === typeof tag
      ? tag
      : pencil.tag(tag);

    first = tag.extend(first).prototype;
  }

  initializing = true;
  prototype = new this();
  initializing = false;

  for (prop in first) {
    prototype[prop] = (
         'function' === typeof first[prop]
      && 'function' === typeof callParent[prop]
      && fnMatch.test(first[prop])
    )
    ? (function (name, fn) {
        return function() {
          var tmp = this.callParent
            , method
            ;
          
          // make `callParent` available
          this.callParent = (function (arg) {
            return callParent[name].apply(this,
              (arg && arg.hasOwnProperty('callee'))
              ? arg
              : arguments
            );           
          }).bind(this);
         
          method = fn.apply(this, arguments);        
          
          this.callParent = tmp;
         
          return method;
        };
      })(prop, first[prop])
    : (function (name, val) {

      // TODO: this should be transformed into a processor like extjs
      if ('params' === name && prototype[prop]) {
        return utils.extend(prototype[prop], val);
      }

      return val;

    })(prop, first[prop]);
  }
 
  function Tag() {
    if (!initializing && this.init) {
      this.init.apply(this, arguments);
    }
  };

  Tag.prototype = prototype;
  Tag.prototype.constructor = Tag;

  // carry the extend method
  Tag.extend = arguments.callee;
  Tag.isTag = true;
 
  return args.length > 0 ? Tag.extend.apply(Tag, args) : Tag;
};