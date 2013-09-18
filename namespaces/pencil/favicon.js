
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

module.exports = pencil.define('pencil.favicon', {

  extend: 'pencil.custom',

  render: function () {

    this.name = 'link';

    this.attr({
      'href': this.attr('href') || this.data('href') || '/favicon.ico',
      'type': 'image/x-icon',
      'rel': 'shortcut icon'
    });

    return this.callParent(arguments);
  }

});