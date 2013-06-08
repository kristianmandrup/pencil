
/*!
 * pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var pencil = require('../../../')
  , min = 'production' == process.env.NODE_ENV
  , baseUrl = '//cdnjs.cloudflare.com/ajax/libs/'
  ;

/**
 * Expose.
 */

module.exports = pencil.extend({

  extend: 'pencil.script',

  render: function () {
    
    var library = this.data('library');
    
    if(library === 'jquery'){
      library = baseUrl + 'jquery/1.8.3/jquery.min.js';
    }
    else if(library == 'lodash'){
      library = baseUrl + 'lodash.js/1.0.0-rc.3/lodash.min.js';
    }
    else if(library == 'angular'){
      library = baseUrl + 'angular.js/1.1.1/angular.min.js';
    }
    else if(library == 'require'){
      //link = baseUrl + 'require.js/2.1.1/require.min.js';
      library = '/js/libs/require/require.min.js';
      this.attr('data-main', this.attr('src'));
    }
    
    this.attr('src', library);

    return this.callParent(arguments);
  }

});