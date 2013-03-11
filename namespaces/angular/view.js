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

Pencil.define('angular.view', {
  
  /**
   * @method initialize
   */
  
  initialize: function(){
    var me = this;
    
    me.tag = me.tag || Pencil.tag();
    
    this.tag
      .clear()
      .tag('div')
      .attr('ng-view', null)
    
    return this;
  }

});  