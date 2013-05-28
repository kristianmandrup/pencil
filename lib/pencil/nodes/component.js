
/*!
 * pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var pencil = require('../../pencil')
  , utils = require('../utils')
  ;

/**
 * Expose `Component`.
 *
 * @api public
 */

module.exports = pencil.extend({

  params: {
    'ccc': '22222222'
  },

  init: function () {

    this.callParent(arguments);

    var attrs = this.attrs
      , attr
      , params = this.block.nodes
      , param
      , label
      ;

    for (var i = 0, len = attrs.length; i < len; ++i) {
      attr = attrs[i];
      this.params[attr.name] = utils.unescape(attr.val);
    }

    this.clear();

    for (var i = 0, len = params.length; i < len; ++i) {
      param = params[i];

      if (pencil.isTag(param)) {
        if (label = param.label()) {
          this.params[param.name] = label;
        }
      }
    }

    if (!this.params.label) {
      this.params.label = this.label();
    }

    this.empty();
  },

  render: function () {

    this.addClass('COMPONENT')

    this.callParent(arguments);
  }

});