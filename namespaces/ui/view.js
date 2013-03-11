/*!
 * Pencil
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */  

var Pencil = require('../../')
  ;

/**
 * view
 */

Pencil.define('ui.view', {
  
  extend: 'ui.component',

  type: 'view',
  
  initialize: function(){
    var self = this
      , tag = self.tag
      ;
    
    self._super.apply(self);

    tag.attr('ng-view', null);
    
    return self;
  }

});  