/*!
 * Pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

var Pencil = require('../../../')
  ;

/**
 * container.container
 */

Pencil.define('pencil.container.container', {
  
  extend: 'pencil.view',
  
  /**
   * @property type
   */
  
  type: 'container',
  
  /**
   * @property clsType
   */
  
  clsType: 'container',
  
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
  
  defaultType: 'pencil.container.container',
  
  /**
   * @method initialize
   */
  
  initialize: function(){
    
    this._super.apply(this, arguments);
    
    // ensure items tag exists for components like containers
    if(!this.items){
      this.items = Pencil.tag()
    }
    
    this.body = Pencil.tag().addClass(this.clsType + '-body');
    
    this.layout = this.getLayout();
  },
  
  /**
   * @method render
   */
  
  render: function(){
    var me = this;
    
    this._super.apply(this, arguments);
    
    this.body.appendTo(this.tag);      
    
    
    if(this.items){
      this.items.children(function(tag){
        Pencil.parse(tag, me.layout.tag)
      })
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
    
    Pencil.tag('script').html('$(function(){' +
      'bui.create(\'pencil.container.container\', {' +
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
    
  },
  
  /**
   * @method getLayout
   */
  
  getLayout: function() {
    return Pencil.create(['pencil.layout', this.layoutType, this.layout].join('.'), {
      owner: this
    })
  },
  
  /**
   * @method setLayout
   */
  
  setLayout: function(layout) {
    this.layout = layout;
    return this
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
    
    var itemType = item.xtype || this.defaultType || 'pencil.component';
    
    if(!item.isTag){
      item = Pencil.create(itemType, item).tag
    }
    
    this.items.append(item)
    
    return this
  }
  
});  