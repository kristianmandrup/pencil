
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
   * param
   */

  'param': function(name){
    if(name && this.params){
      return this.params.values[name];  
    }
    return this.params;
  },

  /**
   * data
   * 
   * Store arbitrary data in the tag or return the value at the named data store.
   */

  'data': function () {
    
  },

  /**
   * data
   * 
   * Remove a previously-stored piece of data.
   */

  'removeData': function () {
    
  }

};