/*!
 * Pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */  

var Pencil = require('../../../')
  , min = 'production' == process.env.NODE_ENV
  , baseUrl = '//cdnjs.cloudflare.com/ajax/libs/'
  ;

/**
 * cdn
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
      link = baseUrl + 'jquery/1.8.3/jquery.min.js';
    }
    else if(library == 'lodash'){
      link = baseUrl + 'lodash.js/1.0.0-rc.3/lodash.min.js';
    }
    else if(library == 'angular'){
      link = baseUrl + 'angular.js/1.1.1/angular.min.js';
    }
    else if(library == 'require'){
      //link = baseUrl + 'require.js/2.1.1/require.min.js';
      link = '/js/libs/require/require.min.js'
      tag.attr('data-main', tag.attr('src'));
    }
    else{
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