/*!
 * Pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */  

var Pencil = require('../../')
  ;

/**
 * form
 */

Pencil.define('pencil.script', {
  
  extend: 'pencil.tag',
  
  /**
   * @method initialize
   */
  
  initialize: function(){
    this._super.apply(this);
    
    var tag = this.tag.tag('script')
      ;
      
    if(!tag.attr('type')){
      tag.attr('type', 'text/javascript');
    }
    
    return this;
  },
  
  render: function(){
    return this._super.apply(this);
  }

});  