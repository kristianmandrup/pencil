/*!
 * Pencil
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */  

var Pencil = require('../../../')
  ;

/**
 * ui.container.border
 */

Pencil.define('ui.container.border', {
  
  extend: 'ui.container.container',
  
  type: 'container',
  
  initialize: function(){
    var self = this;
    
    self._super.apply(self);

    self.tag.attr('x.container.border', null);

    return self;
  },
  
  render: function(){
    var self = this;
    
    self._super.apply(self);
    
    self.tag.children(function(child){
      child.addClass('x-item-' + child.attr('x.region'))
    })  

    return self;
  }

});  