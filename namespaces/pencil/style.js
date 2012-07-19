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

Pencil.define('pencil.style', {
  
  extend: 'pencil.tag',
  
  /**
   * @method initialize
   */
  
  initialize: function(){
    this._super.apply(this);
    
    var tag = this.tag
      , href = tag.attr('href')
      ;
      
    if(href){
      // inside the header
      tag
        .tag('link')
        .attr({
          'type': 'text/css',
          'rel': 'stylesheet'
        })
      ;
    }else{
      // inside the body
      tag
        .tag('style')
        .attr('type', 'text/css')
      ;
    }
    
    return this;
  },
  
  render: function(){
    return this._super.apply(this);
  }

});  