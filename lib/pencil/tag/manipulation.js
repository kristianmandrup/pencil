
/*!
 * pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var pencil = require('../../pencil')
  , util = require('../utils')
  , fs = require('fs')
  , clone = pencil.nodes.Tag.prototype.clone
  ;

// insert

function insert (target, index, element) {
  if (!element.length) {
    if (element.parent) {
      //
      // TODO: remove from current parent
      //
    }
    element.parent = target;
    target.block.nodes.splice(index, 0, element);
  }
  else {
    element = util.slice(element, 0);
    for (var i = 0, len = element.length; i < len; i++){
      if (element[i].parent) {
        //
        // TODO: remove from current parent
        //
      }
      element[i].parent = target;
    }
    Array.prototype.splice.apply(
      target.block.nodes, [index, 0].concat(element)
    )
  }

  return this;
};

/**
 * Expose.
 *
 * @api public
 */

module.exports = pencil.define('pencil.tag.manipulation', {

  /**
   * index.
   *
   * @api public
   */

  'index': function () {
    if (this.parent) {
      for (var i = 0; i < this.parent.block.nodes.length; i++) {
        if (this.tid == this.parent.block.nodes[i].tid) {
          return i;
        }
      };
    }
    
    return -1;
  },

  /**
   * template
   */

  'template': function (file, options) {
    return this.replaceWith(true, pencil.template(file, options || {}));
  },

  /**
   * after
   * 
   * Insert content, specified by the parameter, after each element in the set of matched elements.
   */

  'after': function () {
    return insert.call(this, this.parent, this.index() + 1, arguments);
  },

  /**
   * insertAfter
   * 
   * Insert every element in the set of matched elements after the target.
   */

  'insertAfter': function (target) {
    return insert.call(this, target.parent, target.index() + 1, this);
  },

  /**
   * before
   * 
   * Insert content, specified by the parameter, before each element in the set of matched elements.
   */

  'before': function () {
    return insert.call(this, this.parent, this.index(), arguments);
  },

  /**
   * insertBefore
   * 
   * Insert every element in the set of matched elements before the target.
   */

  'insertBefore': function (target) {
    return insert.call(this, target.parent, target.index(), this);
  },

  /**
   * append
   * 
   * Insert content, specified by the parameter, to the end of each element in the set of matched elements.
   */

  'append': function () {
    return insert.call(this, this, this.block.nodes.length, arguments);
  },

  /**
   * appendTo
   * 
   * Insert every element in the set of matched elements to the end of the target.
   */

  'appendTo': function (parent) {
    return insert.call(this, parent, parent.block.nodes.length, this);
  },

  /**
   * prepend
   * 
   * Insert content, specified by the parameter, to the beginning of each element in the set of matched elements.
   */

  'prepend': function () {
    return insert.call(this, this, 0, arguments);
  },

  /**
   * prependTo
   * 
   * Insert every element in the set of matched elements to the beginning of the target.
   */

  'prependTo': function (parent) {
    return insert.call(this, parent, 0, this);
  },

  /**
   * clone
   * 
   * Create a deep copy of the set of matched elements.
   */

  'clone': function (all) {
    var ret = clone.call(all ? this : this[0]);
    
    ret.parent = this[0].parent;
    
    return ret;
  },

  /**
   * empty
   * 
   * Remove all child nodes of the set of matched elements from the DOM.
   */

  'empty': function () {
    this.block = new pencil.nodes.Block;
    return this;
  },

  /**
   * remove
   * 
   * Remove the set of matched elements from the DOM.
   */

  'remove': function () {
    if(!this.parent) return false;
    
    this.parent.block.nodes.splice(this.index(), 1);
    
    return this;
  },

  /**
   * replaceWith
   * 
   * Replace each element in the set of matched elements with the provided new content and return the set of elements that was removed.
   */

  'replaceWith': function (loopNodes, target) {
    var siblings
      , sibling
      , parent = this.parent
      , realParent = this.realParent
      , i, n
      ;

    if ('boolean' !== typeof loopNodes) {
      target = loopNodes;
      loopNodes = false;
    }

    if (this.realParent) {
      siblings = this.realParent.nodes;

      for (i = 0; i < siblings.length; i++) {
        sibling = siblings[i];

        if (sibling.tid === this.tid) {
          if (!loopNodes || pencil.isTag(target)) {
            // replace single
            target.parent = parent;
            target.realParent = realParent;
            Array.prototype.splice.call(siblings, i, 1, target);

          }
          else if (target.nodes) {
            // replace many
            for (n = 0; n < target.nodes.length; n++) {
              target.nodes[n].parent = parent;
              target.nodes[n].realParent = realParent;
            };
            Array.prototype.splice.apply(siblings, [i, 1].concat(target.nodes));

          }
          break;
        }
      };
    }
  },

  /**
   * wrap
   * 
   * Wrap an HTML structure around each element in the set of matched elements.
   */

  'wrap': function ( node ) {
    var clone = this.clone();

    this.name = node.name;
    this.attrs = node.attrs;
    this.block = node.block;
    this.line = node.line;
    this.textOnly = node.textOnly;
    
    this.append(clone);
    
    return clone
  },

  /**
   * wrapAll
   * 
   * Remove the parents of the set of matched elements from the DOM, leaving the matched elements in their place.
   */

  'wrapAll': function () {

  },

  /**
   * unwrap
   * 
   * Remove the parents of the set of matched elements from the DOM, leaving the matched elements in their place.
   */

  'unwrap': function () {

  },

  /**
   * wrapInner
   * 
   * Wrap an HTML structure around the content of each element in the set of matched elements.
  
   */

  'wrapInner': function ( node ) {
    node.setBlock( this.getBlock() ); 
    this.block = new Pencil.nodes.Block();
    this.append(node);
    return this;
  },



  /**
   * template.
   *
   * @api public
   */

  'template': function (ast, options, yield) {
    if (!ast) {
      return this;
    }

    var mixin
      , mixinName
      , thisAst
      ;

    if ((options === true || options === false) || (options && (
       pencil.isBlock(options)

    //
    // TODO: are all these really needed ???
    //
    || pencil.isTag(options)
    || pencil.isCustom(options)
    || pencil.isNode(options)
    || pencil.isEach(options)
    || pencil.isCode(options)
    || pencil.isCase(options) 
    ))) {
      yield = options;
      options = null;
    }

    if ('string' === typeof ast) {
      ast = pencil.template(ast);
    }

    if (options) {
      options = util.objectToString(options);
    };

    return this.each(function () {
      thisAst = ast.clone();

      if (options) {
        mixinName = 'mixin_' + this.tid;

        // TODO: cache the mixin below
        // mixin create
        mixin = new pencil.nodes.Mixin(mixinName, 'data', thisAst, false);
        //this._parser.mixins[mixinName] = mixin;
        //parser.mixins[mixinName] = mixin;
        this.state.document.nodes.unshift(mixin);
      }

      if (yield) {
        thisAst.includeBlock().push(true === yield ? this : yield);
      }

      if (options){
        // mixin call
        thisAst = new pencil.nodes.Mixin(mixinName, options, null, true);
      }

      this.replaceWith(false, thisAst);
    });
  }

});