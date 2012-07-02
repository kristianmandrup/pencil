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
  
  extend: 'pencil.container.container',
  
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
  
  layoutType: 'container'
  
}); 