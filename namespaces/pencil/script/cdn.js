/*!
 * Pencil
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */  

var Pencil = require('../../../')
  ;

/**
 * form
 */

Pencil.define('pencil.script.cdn', {
  
  extend: 'pencil.script',
  
  /**
   * @method initialize
   */
  
  initialize: function(){
    this._super.apply(this);
    
    
    var tag = this.tag
      , link = null
      , version = null
      ;
    
    var library = tag.param('library');
    
    if(library === 'jquery'){
      // http://code.jquery.com/
      version = version ? '-' + version : '';
      link = 'http://code.jquery.com/jquery' + version + '.min.js';
    }else{
      link = library;
    }
    
    if(link){
      tag
        .attr('src', link)
      ;  
    }
    
    return this;
  },
  
  render: function(){
    return this._super.apply(this);
  }

});  