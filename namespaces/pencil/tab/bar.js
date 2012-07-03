/*!
 * Pencil
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */  

var Pencil = require('../../../')
  ;

/**
 * tab.bar
 */

Pencil.define('pencil.tab.bar', {
  
  extend: 'pencil.panel.header',
  
  /**
   * @property type
   */
  
  type: 'tab-bar',
  
  /**
   * @property clsType
   */
  
  clsType: 'tab-bar',
  
  /**
   * @property defaultType
   */
  
  defaultType: 'pencil.tab.tab',
  
  /**
   * @property position
   */
  
  position: 'top',  //top,bottom,left,right
  
  /**
   * @method init
   */
  
  init: function(){
    
    this._super.apply(this, arguments);
    
    this.strip = Pencil.tag('div', {
      class: 'tab-bar-strip'
    })
    
    this.tag.addClass('tab-bar-' + this.position);
  },
  
  /**
   * @method render
   */
  
  render: function(){
    var me = this;
    
    this._super.apply(this, arguments);
    
    this.tag.append(this.strip)
    
    this.owner.items.children(function(item){      
      if(item.ui){
        me.owner.tabBar.add({
          text: item.ui.title
        })
      }
      
    })      
  }
  
});  