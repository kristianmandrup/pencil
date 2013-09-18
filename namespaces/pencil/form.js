
/*!
 * pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var pencil = require('../../')
  ;

/**
 * Expose.
 */

module.exports = pencil.define('pencil.form', {

  extend: 'pencil.custom',

  render: function () {

    this.name = 'form';

    var method = this.attr('method')
      , hasMethod = !!method
      ;

    method = method || this.data('method') || 'post';

    if (method === 'del') {
      method = 'delete';
      hasMethod = false;
    }
    
    if (!hasMethod || (method != 'get' && method != 'post')) {
      this.attr('method', method == 'get' ? 'get' : 'post');
    }
     
    this.prepend(pencil.create('pencil:input:hidden', {
      'name': '_method',
      'value': method
    }));
        
    return this.callParent(arguments);
  }

});