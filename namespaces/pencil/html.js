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

Pencil.define('pencil.html', {
  
  extend: 'pencil.tag',
  
  /**
   * @method initialize
   */
  
  initialize: function(){
    this._super.apply(this);
    
    var tag = this.tag.tag('html')
      , type = tag.param('lang') || 'en'
      ;
    
    if(!tag.attr('lang')){
      tag.attr('lang', type);
    }
    
    return this;
  },
  
  render: function(){
    return this._super.apply(this);
  }

});  