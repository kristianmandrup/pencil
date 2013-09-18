
/*!
 * pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var pencil = require('../../pencil')
  ;

/**
 * Expose `Custom`.
 *
 * @api public
 */

module.exports = pencil.define('pencil.custom', {


  extend: 'pencil.tag',


  isCustom: true

});