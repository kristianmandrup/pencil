/*!
 * Behere
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */  

var UI = require('../../../')
  , cls = UI.cls
  ;
  
UI.klass.define('bui.layout.layout', {
  
  __init: 'initialize',
  
  /**
   * @property isLayout
   */
  
  isLayout: true,
  
  /**
   * @property owner
   */
  
  owner: null,
  
  /**
   * @property type
   */
  
  type: 'layout',
  
  /**
   * @property clsDefault
   */
  
  clsDefault: 'box',
  
  /**
   * @method initialize
   */
  
  initialize: function(){
    
    
    this.tag = UI.tag({
      class: cls(this.clsDefault+'-body')
    });
    
    this.owner.body
      .addClass(cls(this.clsDefault), cls(this.clsDefault+'-'+this.type))
    ;
  },
  
  /**
   * @method render
   */
  
  render: function(){
    this.tag.appendTo(this.owner.body);
  }

});  