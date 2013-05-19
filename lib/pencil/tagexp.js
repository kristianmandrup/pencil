
/*!
 * pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

/**
 * Expose `Tagexp`.
 *
 * @thanks https://github.com/visionmedia/page.js
 *
 * @api public
 */

var Tagexp = module.exports = function Tagexp (tagexp, options) {
  var self = this
    ;

  options = options || {};

  this.tagexp = tagexp;
  this.regexp = tagexpToRegexp(tagexp
    , this.keys = []
    , options.sensitive
    , options.strict);

  this.validations = [function (name, params, node) {
    return self.match(name, params);
  }];
};

/**
 * match.
 *
 * @api public
 */

Tagexp.prototype.match = function (path, params) {
  var keys = this.keys
    , match = this.regexp.exec(path)
    , wildcard
    ;

  if (!match) return false;

  wildcard = [];

  for (var i = 1, len = match.length; i < len; ++i) {
    var key = keys[i - 1];

    var val = 'string' == typeof match[i]
      ? decodeURIComponent(match[i])
      : match[i];

    if (key) {
      params[key.name] = undefined !== params[key.name]
        ? params[key.name]
        : val;
    } else {
      wildcard.push(val);
    }
  }

  params.wildcard = wildcard;

  return true;
};

// tagexpToRegexp

function tagexpToRegexp (tagexp, keys, sensitive, strict) {
  if (tagexp instanceof RegExp) return tagexp;
  if (tagexp instanceof Array) tagexp = '(' + tagexp.join('|') + ')';
  tagexp = tagexp
    .concat(strict ? '' : '/?')
    .replace(/\/\(/g, '(?\?/')
    .replace(/(\:)?(\.)?\?(\w+)(?:(\(.*?\)))?(\?)?/g, function(_, slash, format, key, capture, optional){
      keys.push({ name: key, optional: !! optional });
      slash = slash || '';
      return ''
        + (optional ? '' : slash)
        + '(?:'
        + (optional ? slash : '')
        + (format || '') + (capture || (format && '([^\:.]+?)' || '([^\:]+?)')) + ')'
        + (optional || '');
    })
    .replace(/([\/.])/g, '\\$1')
    .replace(/\*/g, '(.*)');
  return new RegExp('^' + tagexp + '$', sensitive ? '' : 'i');
};