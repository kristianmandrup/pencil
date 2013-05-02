/*!
 * Pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */  

var Pencil = require('../../../')
  ;

/**
 * form
 */

Pencil.define('pencil.script.manager', {
  
  extend: 'pencil.script',
  
  /**
   * @method initialize
   */
  
  initialize: function(){
    this._super.apply(this);
    
    
    var tag = this.tag = new Pencil.jade.nodes.Tag('script').attr('gino','manager');
    //var tag = this.tag.tag('s');
    

    if(tag.state){
      tag.state.on('fine', function(){
        tag.attr('value', 'gino + ' + Pencil.id())
      })
    }else{
      //console.dir(tag)
      console.log('-----------------')
      //tag.name = 'eeeeeeeeeeeee'
    }
    
    var script1 = Pencil.tag('script').attr('gino','manager').insertAfterTo(this.tag);
    
    return this;
  },
  
  render: function(){
    return this._super.apply(this);
  }

});  