/*!
 * Pencil
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */  

var Pencil = require('../../')
  ;

/**
 * form
 */

Pencil.define('pencil.extension', {
  
  extend: 'pencil.tag',
  
  /**
   * @method initialize
   */
  
  initialize: function(){
    this._super.apply(this);
    
    var tag = this.tag.tag('ext')
      , type = tag.param('type') || 'service'
      , username = tag.param('username')
      , extension = tag.param('extension')
      ;
    
    tag.attr('id', type)
    
    tag.prepend(Pencil.tag('h3').text('form'));
    
    if(tag.is('ext')){
      tag.tag('div');
    }
    
    return this;
  },
  
  render: function(){
    return this._super.apply(this);
  }

});  