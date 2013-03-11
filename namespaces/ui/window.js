/*!
 * Pencil
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */  

var Pencil = require('../../')
  , cls = Pencil.cls
  ;

/**
 * ui.window
 */

Pencil.define('ui.window', {
  
  extend: 'ui.panel',
  
  type: 'window',
  
  clsType: 'window',

  initialize: function(){
    var self = this
      , tag = self.tag.tag('div')
      ;
    
    self._super.apply(self);

    tag.attr('x.window', null);

    return self;
  }

});  