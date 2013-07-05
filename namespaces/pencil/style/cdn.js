
/*!
 * pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var pencil = require('../../../')
  , baseUrl = '/nando/lib/'
  ;

/**
 * Expose.
 */

module.exports = pencil.extend({

  extend: 'pencil.style',
  
  render: function () {
    
    var library = this.data('library');
    
    if ('bootstrap' === library) {
      library = baseUrl + 'bootstrap/css/bootstrap.min.css';
    }
    else if ('bootstrap-responsive' === library) {
      library = baseUrl + 'bootstrap/css/bootstrap-responsive.min.css';
    }

    this.data('href', library);

    return this.callParent(arguments);
  }

});