
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

  //params: {},

  render: function () {

    this.callParent(arguments);

    var attrs = this.attrs
      , attr
      , children = this.block.nodes
      , child
      , label
      ;

    for (var i = 0, len = attrs.length; i < len; ++i) {
      attr = attrs[i];
      this.data(attr.name, utils.unescape(attr.val));
    }

    this.clear();

    for (var i = 0, len = children.length; i < len; ++i) {
      child = children[i];

      if (pencil.isTag(child)) {
        if (child.hasChildren()) {
          this.data(child.name, child.block);
        }
        else if (label = child.label()) {
          this.data(child.name, label);
        }
      }
    }

    if (!this.params.label) {
      this.data('label', this.label());
    }

    this.empty();
    
    return this;
  }

});