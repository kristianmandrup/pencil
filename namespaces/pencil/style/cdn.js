/*!
 * Pencil
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */  

var Pencil = require('../../../')
  , min = 'production' == process.env.NODE_ENV
  , baseUrl = '//cdnjs.cloudflare.com/ajax/libs/'
  ;

/**
 * cdn
 */

Pencil.define('pencil.style.cdn', {
  
  extend: 'pencil.style',
  
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
    
    if(library === 'bootstrap'){
      link = '/css/bootstrap.min.css';
    }
    else{
      link = library;
    }
    
    if(link){
      tag
        .attr('href', link)
      ;  
    }
    
    return this;
  },
  
  render: function(){
    return this._super.apply(this);
  }

});  