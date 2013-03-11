/*!
 * Pencil
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

var Pencil = require('../../../')
  ;

/**
 * container.viewport
 */

Pencil.define('pencil.container.viewport', {
  
  extend: 'pencil.view',
  
  /**
   * @property type
   */
  
  type: 'viewport',
  
  /**
   * @property clsType
   */
  
  clsType: 'viewport',
  
  /**
   * @property layout
   */
  
  layout: 'container',
  
  /**
   * @property layoutType
   */
  
  layoutType: 'container',
  
  /**
   * @method initialize
   */
  
  initialize: function(){
    
    this._super.apply(this, arguments);
    
    this.tag.attr('viewport', '')
  }
  
}); 