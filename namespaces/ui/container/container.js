/*!
 * Pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */  

var Pencil = require('../../../')
  , cls = Pencil.cls
  ;

/**
 * ui.container.layout
 */

Pencil.define('ui.container.container', {
  
  extend: 'ui.component',
  
  type: 'container',
  
  clsType: 'container',
  
  /**
   * @property isContainer
   */
  
  isContainer: true,
  
  initialize: function(){
    var self = this;

    self._super.apply(self);

    //self.body = Pencil.tag().addClass(cls(self.clsType + '-body'));

    return self;
  },
  
  render: function(){
    var self = this;
    
    self._super.apply(self);
    
    //self.body.appendTo(self.tag);
  
    if(self.items){
      self.tag.block.nodes = self.items;

      self.tag.children(function(child){
        Pencil.parse(child, self.tag)
      })
    }

    return self;
  }

});  