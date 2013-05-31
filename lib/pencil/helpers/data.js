
/*!
 * pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var pencil = require('../../pencil')
  ;

/**
 * Expose.
 *
 * @api public
 */

module.exports = {

  /**
   * data
   * 
   * Store arbitrary data in the tag or return the value at the named data store.
   */

  'data': function (name, value) {
    // first: get all
    if (0 === arguments.length) {
      return this[0].params;
    }
    else if (1 === arguments.length) {
      // first: get
      if ('string' === typeof name) {
        return this[0].params[name];
      }
      // all: set object
      else {
        return this.each(function () {
          //this.params = util._extend(this.params, name);
          util._extend(this.params, name);
        });
      }
    }
    // all: set key/value
    else {
      return this.each(function () {
        this.params[name] = value;
      });
    };
  },

  /**
   * data
   * 
   * Remove a previously-stored piece of data.
   */

  'removeData': function () {
    
  }

};