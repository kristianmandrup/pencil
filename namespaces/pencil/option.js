/*!
 * Pencil
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */  

var Pencil = require('../../')
  ;

/**
 * form
 */

Pencil.define('pencil.option', {
  
  extend: 'pencil.tag',
  
  /**
   * @method initialize
   */
  
  initialize: function(){
    this._super.apply(this);
    
    var tag = this.tag.tag('option')
      ;
    
    if(!tag.attr('value')){
      var value = tag.param('value') || ((tag.block && tag.block.nodes && tag.block.nodes[0]) ? tag.block.nodes[0].val : null )
      tag.attr('value', value);
    }
    
    return this;
  },
  
  render: function(){
    return this._super.apply(this);
  }

});  