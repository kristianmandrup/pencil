/*!
 * Pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

var Pencil = require('../../../')
  ;

/**
 * panel.header
 */

Pencil.define('pencil.panel.header', {
  
  extend: 'pencil.container.container',
  
  /**
   * @property type
   */
  
  type: 'header',
  
  /**
   * @method initialize
   */
  
  initialize: function(){
    
    this._super.apply(this, arguments);
    
    this.tag.addClass('panel-header');
    
    this.text = Pencil.tag('span').addClass('panel-header-body-text');
    
  },
  
  /**
   * @method render
   */
  
  render: function(){
    
    this._super.apply(this, arguments);
    
    this.layout.tag.append(this.text)
    
  },
  
  /**
   * @method setTitle
   */
  
  setTitle: function(title){
    this.text.html(title)
  }
  
});  