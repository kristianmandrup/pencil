
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

module.exports = pencil.extend({

  render: function () {

    this.name = 'link';

    this.attr({
      'href': this.attr('href') || this.params.href || '/favicon.ico',
      'type': 'image/x-icon',
      'rel': 'shortcut icon'
    });

    return this.callParent(arguments);
  }

});