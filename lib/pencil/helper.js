
/*!
 * pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var pencil = require('../pencil')
  , utils = require('./utils')
  , util = require('util')
  ;

/**
 * Expose `Helper`.
 *
 * @api public
 */

var Helper = module.exports = function (selector, context) {
  return new Helper.fn._init(selector, context, rootHelper);
};

/**
 * fn.
 *
 * @api public
 */

Helper.fn = Helper.prototype = {

  //constructor: Helper,

  _init: function (selector, context, rootHelper) {
    if ( !selector ) {
      return this;
    }

    //this.context = this[0] = selector;
    //this.length = 1;
    return this;
  }/*,

  // Start with an empty selector
  selector: '',

  // The default length of a Helper object is 0
  length: 0,

  each: function( callback, args ) {
    return Helper.each( this, callback, args );
  },

  first: function() {
    return this.eq( 0 );
  },

  last: function() {
    return this.eq( -1 );
  },

  eq: function( i ) {
    var len = this.length,
      j = +i + ( i < 0 ? len : 0 );
    return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
  }*/
};

// Give the _init function the Helper prototype for later instantiation
Helper.fn._init.prototype = Helper.fn;


Helper.extend = Helper.fn.extend = function() {
  //return pencil.nodes.Custom.extend.apply(pencil.nodes.Custom, arguments);
  if (arguments.length == 0) {
    return pencil.nodes.Custom;
  }

  var args = utils.slice(arguments)
    , first = args.shift()
    , tag
    ;

  if ('string' === typeof first) {
    tag = pencil.tag(first);
  }
  else if (first.isTag) {
    tag = first;
  }
  else {

    // TODO: this should be transformed into a processor like extjs
    if (first.extend) {
      tag = first.extend;
      delete first.extend;

      tag = 'function' === typeof tag
        ? tag
        : pencil.tag(tag);
    }

    tag = (tag || pencil.nodes.Custom).extend(first);
  }

  return args.length > 0 ? tag.extend.apply(tag, args) : tag;
};

//
// Add `jQuery style` methods.
//

['attributes', 'manipulation', 'traversing', 'data', 'events']

.forEach(function (name) {
  util._extend(Helper.fn, require('./nodes/tag/' + name));
});

//rootjQuery = jQuery(document);