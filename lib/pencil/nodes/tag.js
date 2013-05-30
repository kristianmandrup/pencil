
/*!
 * pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var pencil = require('../../pencil')
  , jade = require('jade')
  , Base = pencil.nodes.Tag
  , util = require('util')
  ;

/**
 * Expose `Tag`.
 *
 * @api public
 */

var Tag = module.exports = function Tag () {

  this.add(this);

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
// Extend from `Helper`.
//

Object.keys(pencil.Helper.fn).filter(function(key){
  return !~['constructor', 'init'].indexOf(key);
}).forEach(function (key) {
  Tag.prototype[key] = pencil.Helper.fn[key];
});

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