
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

module.exports = pencil.define('pencil.html', {

  extend: 'pencil.custom',

  render: function () {
    this.name = 'html';

    var lang = this.attr('lang')
      , hasLang = !!lang
      ;
    
    lang = lang || this.data('lang') || 'en';

    if (!hasLang) {
      this.attr('lang', lang);
    }

    this.callParent(arguments);
  }

});