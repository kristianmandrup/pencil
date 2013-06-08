
/*!
 * pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var pencil = require('../../../')
  ;

/**
 * Expose.
 */

module.exports = pencil.extend({

  extend: 'pencil.style',
  
  render: function () {
    
    var library = this.data('library');
    
    if(library === 'bootstrap'){
      library = '/css/bootstrap.min.css';
    }

    this.data('href', library);


    return this.callParent(arguments);
  }

});