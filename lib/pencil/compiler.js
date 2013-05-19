
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
  , Base = jade.Compiler
  , BaseProto = util._extend({}, Base.prototype)
  ;

/**
 * Expose `Compiler`.
 *
 * @api public
 */

var Compiler = module.exports = Base;

/**
 * compile.
 *
 * @api public
 */

Compiler.prototype.compile = function () {
  // pretty
  this.pp = true;

  return BaseProto.compile.apply(this, arguments);
};