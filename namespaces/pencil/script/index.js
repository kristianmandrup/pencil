
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

  render: function () {

    this.name = 'script';
      
    if (!this.attr('type')) {
      this.attr('type', 'text/javascript');
    }

    return this.callParent(arguments);
  }

});