/*!
 * Behere
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

bui.define('foo.view', {
  
  __init: 'initialize',
  
  extend: Backbone.View.prototype,
  
  initialize: function(){
    var me = this;
    
    //console.log("view")
    this.el = $('#' + this.id);
  
    Backbone.View.apply(this, arguments); 
    
    me.model.on('change:color', function(model, color) {
      me.$el.css({background: color});
    });
  },
  
  events: {
    "click": "promptColor"
  },
  
  promptColor: function() {
    var cssColor = prompt("Please enter a CSS color:");
    this.model.set({color: cssColor});
  }
  
});