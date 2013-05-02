/*!
 * Behere
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */  

var UI = require('../../../')
  , cls = UI.cls
  ;
  
UI.klass.define('bui.tab.panel', {
  
  extend: 'bui.panel.panel',
  
  type: 'tabpanel',
  
  layout: 'card',
  
  /**
   * @property showHeader
   */
  
  showHeader: false,
  
  /**
   * @property barPosition
   */
  
  barPosition: 'top',  //top,bottom,left,right
  
  initialize: function(){
    
    this._super.apply(this, arguments);
    
    this.tabBar = UI.klass.create('bui.tab.bar', {
      owner: this,
      position: this.barPosition
    });  
  },
  
  render: function(){
    var me = this;
    
    this._super.apply(this, arguments);
    
    this.tabBar.render();
    
    this.tag.prepend(this.tabBar.tag)
  }
  
});  