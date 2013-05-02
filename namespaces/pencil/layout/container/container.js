/*!
 * Pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */  

var Pencil = require('../../../../')
  ;

/**
 * layout.container.container
 */

Pencil.define('pencil.layout.container.container', {
  
  extend: 'pencil.layout.layout',
  
  /**
   * @property type
   */
  
  type: 'container',
  
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
    var me = this;
    
    this._super.apply(this, arguments);
    
    if(this.owner.items){
      this.owner.items.children(function(tag){
        tag.addClass(me.clsType + '-item')
      })
    }    
  }

});  