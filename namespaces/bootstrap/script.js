/*!
 * Pencil (support for Bootstrap)
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */  

var Pencil = require('../../')
  ;

/**
 * form
 */

Pencil.define('bootstrap.script', {
  
  extend: 'pencil.script',
  
  /**
   * @method initialize
   */
  
  initialize: function(){
    this._super.apply(this);
    
    var tag = this.tag
      , mode = tag.param('mode') || 'debug'
      , link = '/bootstrap/js/bootstrap{0}.js'
      ;

    tag.attr('scr', link.replace('{0}', mode==='min' ? '.min' : ''));
    
    return this;
  },
  
  render: function(){
    return this._super.apply(this);
  }

});  