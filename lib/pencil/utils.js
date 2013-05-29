
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
  },

  'objectToString': function unescape (o) {
    return _objectToString(o);
  },

  'trim': function unescape (text) {
    return text == null ? "" : String.prototype.trim.call( text );
  }

};


function _objectToString (obj) {
  var ret = []
    , t
    , p
    ;

  for(p in obj){ 
    if(obj.hasOwnProperty(p)){
      if (t = obj[p]) {
        if('object' === typeof t){
          ret[ret.length]= p + ':' + _objectToString(t);
        }
        else if('string' === typeof t){
          ret[ret.length] = [ p + ': \"' + t.toString() + '\"' ];
        }
        else{
          ret[ret.length] = [ p + ': ' + t.toString()];
        }
      }
    }
  }
  return '{' + ret.join(', ') + '}';
}