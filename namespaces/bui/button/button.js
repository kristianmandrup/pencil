/*!
 * Behere
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

var UI = require('../../../')
  , cls = UI.cls
  ;
  
UI.klass.define('bui.button.button', {
  
  extend: 'bui.component.component',
  
  type: 'button',
  
  clsDefault: 'button',
  
  initialize: function(){
    this._super.apply(this, arguments);
    
    var buttonCls = cls(this.clsDefault);
    
    this.body = UI.tag('em', {
      class: buttonCls+'-body'
    });
    
    this.button = UI.tag('button', {
      type: 'button',
      class: buttonCls+'-inner'
    });
    
    this.text = UI.tag('span', {
      class: buttonCls+'-text'
    }).html(this.text);
    
    this.icon = UI.tag('span', {
      class: buttonCls+'-icon'
    });
    
    this.button.appendTo(this.body).append(this.text, this.icon);
    
    this.tag.append(this.body);
  },
  
  render: function(){
    this._super.apply(this, arguments);
  }

});  