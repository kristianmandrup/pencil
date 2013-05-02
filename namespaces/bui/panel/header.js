/*!
 * Behere
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

var UI = require('../../../')
  , cls = UI.cls
  ;
  
UI.klass.define('bui.panel.header', {
  
  extend: 'bui.container.container',
  
  type: 'header',
  
  /**
   * @property title
   */
  
  title: null,
  
  initialize: function(){
    this._super.apply(this, arguments);
    
    var headerCls = cls('panel-header');
    
    this.tag.addClass(headerCls);
    
    this.text = UI.tag('span', {
      class: headerCls+'-body-text'
    });
    
    this.setTitle(this.title);
  },
  
  render: function(){
    
    this._super.apply(this, arguments);

    this.layout.tag.append(this.text);
  },
  
  /**
   * @method setTitle
   */
  
  setTitle: function(title){
    if(title){
      this.title = title;
      this.text.html(title);
    }
  }
  
});  