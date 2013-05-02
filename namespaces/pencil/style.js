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

Pencil.define('pencil.style', {
  
  extend: 'pencil.tag',
  
  /**
   * @method initialize
   */
  
  initialize: function(){
    this._super.apply(this);
    
    var tag = this.tag
      , source = tag.attr('href') || tag.attr('src')
      , hasSource = !!source
      ;

    if(hasSource){
      tag.removeAttr('href', 'src');
    }

    if((tag && tag.parent && tag.parent.name === 'head') || hasSource){
      // inside the header
      tag
        .tag('link')
        .attr({
          'type': 'text/css',
          'rel': 'stylesheet',
          'href': source
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