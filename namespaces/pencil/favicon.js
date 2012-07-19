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

Pencil.define('pencil.favicon', {
  
  extend: 'pencil.tag',
  
  /**
   * @method initialize
   */
  
  initialize: function(){
    this._super.apply(this);
    
    var tag = this.tag.tag('link')
      , href = tag.attr('href')
      ;
      
    if(!href){
      href = '/favicon.ico';
    }
    
    tag
      .attr({
        'href': href,
        'type': 'image/x-icon',
        'rel': 'shortcut icon'
      })
    ;
    
    return this;
  },
  
  render: function(){
    return this._super.apply(this);
  }

});  