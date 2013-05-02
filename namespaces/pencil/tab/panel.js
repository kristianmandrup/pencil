/*!
 * Pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */  

var Pencil = require('../../../')
  ;

/**
 * tab.panel
 */

Pencil.define('pencil.tab.panel', {
  
  extend: 'pencil.panel.panel',
  
  /**
   * @property type
   */
  
  type: 'tabpanel',
  
  /**
   * @property layout
   */
  
  layout: 'card',
  
  /**
   * @property showHeader
   */
  
  showHeader: false,
  
  /**
   * @property barPosition
   */
  
  barPosition: 'top',  //top,bottom,left,right
  
  /**
   * @method initialize
   */
  
  initialize: function(){
    
    this._super.apply(this, arguments);
    
    this.tabBar = Pencil.create('pencil.tab.bar', {
      owner: this,
      position: this.barPosition
    });
    
  },
  
  /**
   * @method render
   */
  
  render: function(){
    var me = this;
    
    this._super.apply(this, arguments);
    
    

    
    
    
    this.tabBar.render();
    
    this.tag.prepend(this.tabBar.tag)
    
  }
  
});  