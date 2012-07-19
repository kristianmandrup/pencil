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

Pencil.define('pencil.form', {
  
  extend: 'pencil.tag',
  
  /**
   * @method initialize
   */
  
  initialize: function(){
    this._super.apply(this);
    
    var tag = this.tag.tag('form')
      , method = tag.attr('method') || tag.param('method')
      ;
    
    if(method){
      if(method === 'del'){
        method = 'delete';
      }
      tag.attr('method', method == 'get' ? 'get' : 'post');
    }else{
      method = 'post';
      tag.attr('method', method);
    }
    
    tag.prepend(Pencil.tag('input').attr({
      'type': 'hidden',
      'name': '_method',
      'value': method
    }));
    
    return this;
  },
  
  render: function(){
    return this._super.apply(this);
  }

});  