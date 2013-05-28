
/*!
 * pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var pencil = require('../../pencil')
  , Base = pencil.nodes.Tag
  , util = require('util')
  ;

/**
 * Expose `Tag`.
 *
 * @api public
 */

var Tag = module.exports = function Tag () {

  // id
  this.__defineGetter__('id', function () {
    return this.getAttr('id');
  });
  this.__defineSetter__('id', function (val) {
    this.setAttr('id', val);
  });

  // tid
  this.tid = pencil.tid();

  Base.apply(this, arguments);
};

// Extends from `jade.nodes.Tag`

pencil.inherits(Tag, Base);

//
// Add `jQuery style` methods.
//

['attributes', 'manipulation', 'traversing', 'data', 'events']

.forEach(function (name) {
  //util._extend(Tag.prototype, require('./tag/' + name));
});

util._extend(Tag.prototype, pencil.Helper.fn);

/**
 * isTag.
 *
 * @api public
 */

Tag.isTag = true;

/**
 * render.
 *
 * @api public
 */

Tag.prototype.render = function () {

  this.isRendered = true;
  this.isChanged = false;

  pencil.walkThrough(this.block, function (node, nodes, index) {
    node.render();
  }, function (tag) {
    return !tag.isRendered || tag.isChanged;
  });

  return this;
};

/**
 * is
 * Check the type of the tag
 */

Tag.prototype.is = function(name){
  return (this.name && this.name === name);
};