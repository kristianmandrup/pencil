
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

    this.name = 'html';

    var lang = this.attr('lang')
      , hasLang = !!lang
      ;
    
    lang = lang || this.data('lang') || 'en';

    if (!hasLang) {
      this.attr('lang', lang);
    }

    return this.callParent(arguments);
  }

});