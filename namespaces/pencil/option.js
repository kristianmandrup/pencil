
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

module.exports = pencil.define('pencil.option', {

  extend: 'pencil.custom',

  render: function () {

    this.name = 'option';

    var label = this.label()
      , hasLabel = !!label
      , value = this.attr('value')
      , hasValue = !!value
      ;

    value = value || this.data('value');

    if (!hasLabel) {
      label = this.data('label') || value;
      this.label(label);
    }

    if (!value) {
      value = label;
    }

    if (!hasValue && value) {
      this.attr('value', value);
    }
    
    return this.callParent(arguments);
  }

});