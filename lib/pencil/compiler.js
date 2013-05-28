
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
  ;

/**
 * Expose `Compiler`.
 *
 * @api public
 */

var Compiler = module.exports = function (node, options) {
  
  options.compileDebug = false;
  
  Compiler.super_.call(this, node, options);
};

util.inherits(Compiler, jade.Compiler);

/**
 * compile.
 *
 * @api public
 */

//Compiler.prototype.compile = function () {
//  return Compiler.super_.prototype.compile.apply(this, arguments);
//};