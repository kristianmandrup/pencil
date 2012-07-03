/*!
 * Pencil
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */  

var Pencil = require('../../../')
  ;

/**
 * layout.layout
 */

Pencil.define('pencil.layout.layout', {
  
  /**
   * @property type
   */
  
  type: 'layout',
  
  /**
   * @property clsType
   */
  
  clsType: 'box',
  
  /**
   * @property owner
   */
  
  owner: null,
  
  /**
   * @property isLayout
   */
  
  isLayout: true,
  
  /**
   * @method initialize
   */
  
  initialize: function(){
    var me = this;
    
    this.tag = Pencil.tag().addClass(this.clsType + '-body');
    
    this.owner.body
      .addClass(this.clsType)
      .addClass(this.clsType + '-' + this.type)
    ;
  },
  
  /**
   * @method render
   */
  
  render: function(){
    var me = this;
    
    this.tag.appendTo(this.owner.body);
  }

});  