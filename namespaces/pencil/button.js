
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

module.exports = pencil.define('pencil.button', {

  extend: 'pencil.custom',

  render: function () {

    this.name = 'button';

    var type = this.attr('type')
      , hasType = !!type
      ;
    
    type = type || this.data('type') || 'button';

    if (!hasType) {
      this.attr('type', type);
    }

    return this.callParent(arguments);
  }

});