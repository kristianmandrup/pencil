/*!
 * Behere
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */ 

var UI = require('../../../')
  , cls = UI.cls
  ;
  
UI.klass.define('bui.component.scroll', {
  
  /**
   * @property autoscroll
   */
  
  autoscroll: false,
  
  /**
   * @method initialize
   */
  
  initialize: function(){
    
    if(this.autoscroll || typeof this.autoscroll === 'string'){
      this.autoscroll = (this.autoscroll === 'true') ? true : false;
    }
    
    this._super.apply(this, arguments);
  },
  
  /**
   * @method render
   */
  
  render: function(){
    this._super.apply(this, arguments);
    
    if(this.autoscroll){
      
      this.autoscroll = UI.tag({
        class: 'WRAP'
      });
      
      //this.autoscroll = this.body.wrap(this.autoscroll);
      
      this.body
        .addClass('x-scroll-wrap')
        .css({
          'height': this.height,
          'width': this.width
        })
        ;
        
      this.layout.tag
        .addClass('x-scroll-body')
        .css({
          'height': this.height,
          'width': this.width
        })
        ;
      
      UI.tag('script', {
        type: 'text/javascript'
      }).html('$(function(){' +
        '$("#'+this.id+'").children(".x-scroll-wrap:first").antiscroll();' + 
      '})').appendTo(this.tag);
      
    }
  }
  
}); 