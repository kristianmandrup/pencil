/*!
 * Pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */  

var Pencil = require('../../')
  , cls = Pencil.cls
  ;

/**
 * ui.panel
 */

Pencil.define('ui.panel', {
  
  extend: 'ui.component',
  
  type: 'panel',
  
  clsType: 'panel',

  initialize: function(){
    var self = this
      , tag = self.tag.tag('div')
      , region = tag.param('region')
      ;
    
    self._super.apply(self);

    if(region){
      tag
      .attr('x.region', region)
    }

    tag.addClass(cls('item'));

    return self;
  },
  
  render: function(){
    var self = this
      , tag = self.tag
      ;
    
    self._super.apply(self);
  
    if(self.items){
      tag.block.nodes = self.items;

      tag.children(function(child){
        Pencil.parse(child, tag)
      })
    }

    return self;
  }

});  