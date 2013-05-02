/*!
 * Pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */  

var Pencil = require('../../')
  , cls = Pencil.cls
  ;

/**
 * ui.component
 */

Pencil.define('ui.component', {
  
  extend: 'ui.tag',
  
  /**
   * @property type
   */
  
  type: 'component',
  
  /**
   * @property owner
   */
  
  owner: null,
  
  /**
   * @property isComponent
   */
  
  isComponent: true,
  
  /**
   * @property clsType
   */
  
  clsType: 'component',
  
  /**
   * @property clsCustom
   */
  
  clsCustom: '',
  
  /**
   * @property items
   */
  
  items: [],
  
  initialize: function(){
    var self = this
      , tag = self.tag || Pencil.tag('div');

    self._super.apply(self);
    
    if(!self.id) {
      self.id = Pencil.id(self.type)
    }
    
    // Register attributes
    tag.attr(function(name, value){
      self[name] = value      
    });

    // Register child nodes
    if(tag.block && tag.block.nodes){
      self.items = tag.block.nodes;
    }
    
    // Clear and set tag element
    tag
      .clear()
      .tag('div')
      .attr('id', self.id)
      .addClass(cls(self.clsType || self.type))
    ;
    
    if(self.clsCustom && self.clsCustom !== ''){
      self.tag.addClass(cls(self.clsCustom))
    }
    
    // angular
    if(self.repeat){
      tag.attr('ng-repeat', self.repeat)
    }
    return self;
  },
  
  render: function(){
    var self = this;

    self._super.apply(self);
    
    return self;
  }

});  