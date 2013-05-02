/*!
 * Behere
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

bui.define('foo.model', {
  
  __init: 'initialize',
  
  extend: Backbone.Model.prototype,
  
  initialize: function(){
    var me = this;
    
    //console.log("model")
  
    Backbone.Model.apply(this, arguments); 

  }
  
});