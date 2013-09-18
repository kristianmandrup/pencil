
/*!
 * pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var pencil = require('../../pencil')
  , util = require('../utils')
  ;

/**
 * Expose `Tag`.
 *
 * @api public
 */

var Tag = module.exports = pencil.define('pencil.tag', {


  extend: pencil.nodes.Tag,


  mixins: {
    'attributes': require('../tag/attributes'),
    'manipulation': require('../tag/manipulation'),
    'traversing': require('../tag/traversing'),
    'data': require('../tag/data'),
    'events': require('../tag/events')
  },


  isTag: true,

  //
  // constructor
  //

  constructor: function Tag (name, block, params, parser) {

    this.params = util.merge({}, this.params || {}, params);

    this.add(this);

    // id
    this.__defineGetter__('id', function () {
      return this.getAttr('id');
    });
    this.__defineSetter__('id', function (val) {
      this.setAttr('id', val);
    });

    // tid
    this.tid = pencil.tid();

    this.callParent(arguments);
  },


  /**
   * render.
   *
   * @api public
   */

  render: function () {
    // if (this.block) {
    //   util.forEach(this.block.nodes, function (tag) {
    //     if (tag.render) {
    //       tag.render && tag.render();
    //     }
    //     else if (tag.nodes) {
    //       console.log(tag.block);
    //     }
    //   });
    // }

    return this;
  },


  /**
   * is
   * Check the type of the tag
   */

  is: function(name){
    return (this.name && this.name === name);
  },


  init: function (selector, context, rootHelper) {

    if ( !selector ) {
      return this;
    }

    //this.context = this[0] = selector;
    //this.length = 1;
    return this;
  },

  // The default length of a Helper object is 0
  length: 0,

  add: function () {
    for (var i = 0; i < arguments.length; i++) {
      this[this.length++] = arguments[i];
    } 
    return this;
  },
  
  rm: function () {
  },

  // Start with an empty selector
  selector: '',

  each: function( callback, args ) {
    return Tag.each( this, callback, args );
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


});




Tag.each = function( obj, callback, args ) {
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