
/*!
 * pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var util = module.exports = require('util')
  ;
  
/**
 * Expose.
 *
 * @api public
 */

util.extend = function extend (target, add) {
  if (!add || 'object' !== typeof add) {
    return target;
  }

  Object.keys(add).forEach(function (name) {
    target[name] = add[name];
  });

  return target;
};

//

util.extend(util, {

  'slice': function slice (o, count) {
    return Array.prototype.slice.call(o, count || 0);
  },

  'escape': function escape (val) {
    return '"' + val + '"';
  },

  'unescape': function unescape (val) {
    return val ? val.replace(/^['"]|['"]$/g, '') : null;
  },

  'objectToString': function unescape (o) {
    return _objectToString(o);
  },

  'trim': function unescape (text) {
    return null == text ? '' : String.prototype.trim.call( text );
  },

  'isPath': function unescape (text) {
    return null == text ? false : !!text.match(/[\\\/]/);
  }

});

//

function _objectToString (obj) {
  var ret = []
    , t
    , p
    ;

  for(p in obj){ 
    if(obj.hasOwnProperty(p)){
      if (t = obj[p]) {
        if('object' === typeof t){
          ret[ret.length] = p + ':' + _objectToString(t);
        }
        else if('string' === typeof t){
          ret[ret.length] = [p + ': \"' + t.toString() + '\"'];
        }
        else{
          ret[ret.length] = [p + ': ' + t.toString()];
        }
      }
    }
  }
  return '{' + ret.join(', ') + '}';
}