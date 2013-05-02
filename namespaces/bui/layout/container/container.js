/*!
 * Behere
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */  

var UI = require('../../../../')
  , cls = UI.cls
  ;
  
UI.klass.define('bui.layout.container.container', {
  
  extend: 'bui.layout.layout',
  
  type: 'container',
  
  initialize: function(){
    this._super.apply(this, arguments);
  },
  
  render: function(){
    var me = this;
    
    this._super.apply(this, arguments);
    
    if(this.owner.items){
      this.owner.items.children(function(tag){
        tag.addClass(cls(me.clsDefault+'-item'));
      });
    }    
  }

});  