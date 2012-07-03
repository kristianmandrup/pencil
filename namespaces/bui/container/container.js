/*!
 * Behere
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

var UI = require('../../../')
  , cls = UI.cls
  ;

UI.klass.define('bui.container.container', {
  
  extend: 'bui.component.component',
  
  type: 'container',
  
  mixins: [
   'bui.component.scroll'
  ],
  
  clsDefault: 'container',
  
  /**
   * @property layout
   */
  
  layout: 'container',
  
  /**
   * @property layoutType
   */
  
  layoutType: 'container',
  
  /**
   * @property defaultType
   */
  
  defaultType: 'bui.container.container',
  
  initialize: function(){
    
    this._super.apply(this, arguments);
    
    // ensure items tag exists for components like containers
    if(!this.items){
      this.items = UI.tag()
    }
    
    this.body = UI.tag().addClass(cls(this.clsDefault + '-body'));
    
    this.setLayout();
  },
  
  render: function(){
    var me = this;
    
    this._super.apply(this, arguments);
    
    this.body.appendTo(this.tag);      
    
    if(this.items){
      this.items.children(function(tag){
        tag = UI._parse(tag, me.layout.tag)
      });
    }
    
    if(this.items){
      this.layout.tag.block = this.items.block;  
    }
    
    this.layout.render();
    
    if(this.content.length > 0){
      
      //console.log('--------------------------', this.content)
      
      //this.content = behere.Array.flatten(this.content);
      
      this.layout.tag.html(this.content.join(' '))
    }
   
 
    /*
    UI.tag('script').html('$(function(){' +
      'bui.create(\'bui.container.container\', {' +
        //'el: $(\'#'+ this.id + '\'),' +
        'id: \''+ this.id + '\',' +
        'model: coffee' +
        '' +
      '})' +
      
      '' +
      '' +
      '' +
      '' +
      '' +
    '})').appendTo(this.tag);
    */
  },
  
  /**
   * @method getLayout
   */
  
  getLayout: function() {
    return UI.klass.create(['bui.layout', this.layoutType, this.layout].join('.'), {
      owner: this
    });
  },
  
  /**
   * @method setLayout
   */
  
  setLayout: function(layout) {
    this.layout = layout || this.getLayout();
    return this;
  },
  
  /**
   * @method add
   */
  
  add: function(item) {
    
    /*
    if(item){
      this.items.append(behere.ui.tag().html(item.text))  
    }
    */
    
    var itemType = item.xtype || this.defaultType || 'bui.component';
    
    if(!item.isTag){
      item = UI.klass.create(itemType, item).tag
    }
    
    this.items.append(item)
    
    return this
  }
  
});  