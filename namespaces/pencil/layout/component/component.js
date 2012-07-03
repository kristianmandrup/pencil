/*!
 * Pencil
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

var Pencil = require('../../../../')
  ;

/**
 * layout.component.component
 */

Pencil.define('pencil.layout.component.component', {
  
  extend: 'pencil.layout.layout',
  
  /**
   * @property type
   */
  
  type: 'component',
  
  /**
   * @method initialize
   */
  
  initialize: function(){
    
    this._super.apply(this, arguments);
  },
  
  /**
   * @method render
   */
  
  render: function(){
    
    this._super.apply(this, arguments);      
  }
  
});  