
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
  //return new Helper.fn.init(selector, context, rootHelper);
  return new Helper.fn.init(selector, context);
};

/**
 * fn.
 *
 * @api public
 */

Helper.fn = Helper.prototype = {

  constructor: Helper,

  init: function (selector, context, rootHelper) {

    if ( !selector ) {
      return this;
    }

    //this.context = this[0] = selector;
    //this.length = 1;
    return this;
  },

  add: function (tag) {
    this[this.length++] = tag;
    
    return this;
  },

  // Start with an empty selector
  selector: '',

  // The default length of a Helper object is 0
  length: 0,

  each: function( callback, args ) {
    return Helper.each( this, callback, args );
  }/*,

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

// Give the init function the Helper prototype for later instantiation
Helper.fn.init.prototype = Helper.fn;


Helper.extend = function() {
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




Helper.each = function( obj, callback, args ) {
  var value,
    i = 0,
    length = obj.length,
    isArray = isArraylike( obj );

  if ( args ) {
    if ( isArray ) {
      for ( ; i < length; i++ ) {
        value = callback.apply( obj[ i ], args );

        if ( value === false ) {
          break;
        }
      }
    } else {
      for ( i in obj ) {
        value = callback.apply( obj[ i ], args );

        if ( value === false ) {
          break;
        }
      }
    }

  // A special, fast, case for the most common use of each
  } else {
    if ( isArray ) {
      for ( ; i < length; i++ ) {
        value = callback.call( obj[ i ], i, obj[ i ] );

        if ( value === false ) {
          break;
        }
      }
    } else {
      for ( i in obj ) {
        value = callback.call( obj[ i ], i, obj[ i ] );

        if ( value === false ) {
          break;
        }
      }
    }
  }

  return obj;
};


function isArraylike( obj ) {
  var length = obj.length;


  return Array.isArray(obj) || typeof obj !== "function" &&
    ( length === 0 ||
    typeof length === "number" && length > 0 && ( length - 1 ) in obj );
};


//
// Add `jQuery style` methods.
//

['attributes', 'manipulation', 'traversing', 'data', 'events']

.forEach(function (name) {
  util._extend(Helper.fn, require('./helpers/' + name));
});

//rootjQuery = jQuery(document);


var gino = new Helper;

gino.data()