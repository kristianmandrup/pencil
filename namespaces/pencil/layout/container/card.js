/*!
 * Pencil
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */  

var Pencil = require('../../../../')
  ;

/**
 * layout.container.card
 */

Pencil.define('pencil.layout.container.card', {
  
  extend: 'pencil.layout.container.container',
  
  /**
   * @property type
   */
  
  type: 'card',
  
  /**
   * @method init
   */
  
  init: function(){
    
    this._super.apply(this, arguments);
  },
  
  /**
   * @method render
   */
  
  render: function(){
    
    this._super.apply(this, arguments);
    
    this.tag.append(Pencil.tag().addClass('clearfix'));
  }
  
});  