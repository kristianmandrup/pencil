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

Pencil.define('pencil.meta', {
  
  extend: 'pencil.tag',
  
  /**
   * @method initialize
   */
  
  initialize: function(){
    this._super.apply(this);
    
    var tag = this.tag
      , type = tag.param('type') || 'en'
      ;

    if(tag.name == 'charset' || type == 'charset'){
      tag.attr('charset', 'utf-8');
    }
    else if(tag.name == 'chromeframe' || type == 'chromeframe'){
      tag.attr({
        'http-equiv': 'X-UA-Compatible',
        'content': 'IE=Edge,chrome=1'
      });
    }

    tag = tag.tag('meta');
    
    return this;
  }

});  