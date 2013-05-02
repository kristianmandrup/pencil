/*!
 * Pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */  

var Pencil = require('../../../')
  ;

/**
 * tab.tab
 */

Pencil.define('pencil.tab.tab', {
  
  extend: 'pencil.button.button',
  
  /**
   * @property type
   */
  
  type: 'tab',
  
  /**
   * @property clsType
   */
  
  clsType: 'tab',
  
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