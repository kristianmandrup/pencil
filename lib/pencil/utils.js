
/*!
 * pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

/**
 * Expose.
 *
 * @api public
 */

exports = module.exports = {

  'slice': function slice (o, count) {
    return Array.prototype.slice.call(o, count || 0);
  },

  'escape': function escape (val) {
    return '"' + val + '"';
  },

  'unescape': function unescape (val) {
    return val ? val.replace(/^['"]|['"]$/g, '') : null;
  }

};