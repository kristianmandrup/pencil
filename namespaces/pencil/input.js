
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

  init: function () {

    this.callParent(arguments);
  },
  
  render: function () {

    this.name = 'input';

    var type = this.attr('type')
      , hasType = !!type
      , name = this.attr('name')
      , hasName = !!name
      , value = this.attr('value')
      , hasValue = !!value
      ;
    
    type = type || this.data('type') || 'text';
    name = name || this.data('name');
    value = value || this.data('value');

    if (!hasType) {
      this.attr('type', type);
    }

    if (!hasName && name) {
      this.attr('name', name);
    }

    if (!hasValue && value) {
      this.attr('value', value);
    }

    return this.callParent(arguments);
  }

});