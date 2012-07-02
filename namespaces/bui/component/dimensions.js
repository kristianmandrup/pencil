/*!
 * Behere
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */ 

var UI = require('../../../')
  , cls = UI.cls
  ;
  
UI.klass.define('bui.component.dimensions', {
  
  /**
   * @property width
   */
  
  width: null,
  
  /**
   * @property height
   */
  
  height: null,
  
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