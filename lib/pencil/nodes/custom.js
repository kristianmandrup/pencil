
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
  , carries = ['selfClosing', 'line', 'textOnly', 'code']
  , initializing = false
  , fnMatch = /xyz/.test(function () {xyz;}) ? /\bcallParent\b/ : /.*/
  ;

/**
 * Expose `Custom`.
 *
 * @api public
 */

var Custom = module.exports = function Tag (name) {
  if (!initializing && this.init) {
    this.init.apply(this, arguments);
  }
};

Custom.isTag = true;

// Extends from `jade.nodes.Tag`

pencil.inherits(Custom, Base);

/**
 * render.
 *
 * @api public
 */

Custom.prototype.init = function (node, params) {
  if ('string' === typeof node) {
    Custom.super_.call(this, node);
  }
  else {

    Custom.super_.call(this, node.name, node.block);
    this.attrs = node.attrs;

    carries.forEach(function (name) {
      this[name] = node[name];
    }, this);
  }

  //this.name = 'custom';

  this.params = params || {};
};

/**
 * Custom flag.
 *
 * @api public
 */

Custom.prototype.isCustom = true;

/**
 * render.
 *
 * @api public
 */

Custom.prototype.render22 = function () {
  
  pencil.walkThrough(this.block, function (node, nodes, index) {
    nodes[index] = pencil.create(node, {});
  });

  return this;
};

/**
 * extend.
 *
 * @api public
 */

Custom.extend = function () {
  var callParent = this.prototype
    , prototype
    , prop
    , args = Array.prototype.slice.call(arguments, 0)
    , props = args.shift()
    , toExtend
    ;
  
  if ('string' === typeof props) {
    props = pencil.tag(props).prototype;
  }
  else if (props.isTag) {
    props = props.prototype;
  }
  else if (props.extend) {
    toExtend = props.extend;
    delete props.extend;

    props = ('function' === typeof toExtend
      ? toExtend
      : pencil.tag(toExtend)
    ).prototype;
  }

  initializing = true;
  prototype = new this();
  initializing = false;

  for (prop in props) {
    prototype[prop] = (
         'function' === typeof props[prop]
      && 'function' === typeof callParent[prop]
      && fnMatch.test(props[prop])
    )
    ? (function (name, fn) {
        return function() {
          var tmp = this.callParent
            , method
            ;
          
          // make `callParent` available
          this.callParent = (function (arg) {
            return callParent[name].apply(this,
              (arg && arg.hasOwnProperty('callee'))
              ? arg
              : arguments
            );
          }).bind(this);
         
          method = fn.apply(this, arguments);        
          
          this.callParent = tmp;
         
          return method;
        };
      })(prop, props[prop])
    : props[prop];
  }
 
  function Tag() {
    if (!initializing && this.init) {
      this.init.apply(this, arguments);
    }
  };

  Tag.prototype = prototype;
  Tag.prototype.constructor = Tag;

  // carry the extend method
  Tag.extend = arguments.callee;
  Tag.isTag = true;
 
  return args.length > 0 ? Tag.extend.apply(Tag, args) : Tag;
};