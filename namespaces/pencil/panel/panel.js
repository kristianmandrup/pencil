/*!
 * Pencil
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */  

var Pencil = require('../../../')
  ;

/**
 * panel.panel
 */

Pencil.define('pencil.panel.panel', {
  
  extend: 'pencil.container.container',
  
  /**
   * @property type
   */
  
  type: 'panel',
  
  /**
   * @property clsType
   */
  
  clsType: 'panel',
  
  /**
   * @property title
   */
  
  title: ' ',
  
  /**
   * @property showHeader
   */
  
  showHeader: true,
  
  /**
   * @method initialize
   */
  
  initialize: function(){
    
    this._super.apply(this, arguments);
    
    if(this.showHeader){
      this.header = Pencil.create('pencil.panel.header', {
        owner: this
      });
      
      this.header.setTitle(this.title);
    }
    
    this.footer = Pencil.tag().addClass(this.clsType + '-footer');
    this.footerBody = Pencil.tag().addClass(this.clsType + '-footer-body').appendTo(this.footer);
  },
  
  /**
   * @method render
   */
  
  render: function(){
    
    this._super.apply(this, arguments);
    
    //.addClass('clearfix').appendTo(this.tag);
    
    if(this.showHeader){
      this.header.render();
      this.tag.prepend(this.header.tag)
    }
    
    this.tag.append(this.footer)
  }
  
});  