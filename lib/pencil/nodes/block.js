/*!
 * pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var jade = require('jade')
  , util = require('util')
  , Base = jade.nodes.Tag
  , BaseProto = Base.prototype
  ;

/**
 * Expose `Block`.
 *
 * @api public
 */

var Block = module.exports = Base;