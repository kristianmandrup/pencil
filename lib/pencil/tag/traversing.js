
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
 * Expose.
 *
 * @api public
 */

module.exports = pencil.define('pencil.tag.traversing', {

  /**
   * hasChildren
   *
   * Check if the current tab has child nodes.
   */

  'hasChildren': function () {
    // SHOULD USE THE WALKTHROUGH **************
    return !this.block.isEmpty();
  },

  /**
   * children
   * 
   * Get the children of each element in the set of matched elements, optionally filtered by a selector.
   */

  'children': function (repeater) {
    if(!repeater && this.block){
      
      return this.block.nodes; //pencil.walkThrough(this.block, []);//this.block.nodes;
    }else if(repeater && this.hasChildren()){
      //
      // ***********************
      // USE WALKTHROUGH
      //
      for(var i=0;i<this.block.nodes.length;i++){
        this.block.nodes[i].index = i;
        //this.block.nodes[i].parent = this;
        
        repeater.call(this, this.block.nodes[i], i, this.block.nodes)
      }
    }

    return this;
  },

  /**
   * closest
   * 
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   */

  'closest': function () {

  },

  /**
   * contents
   * 
   * Get the children of each element in the set of matched elements, including text and comment nodes.
   */

  'contents': function () {

  },

  /**
   * next
   * 
   * Get the immediately following sibling of each element in the set of matched elements. If a selector is provided, it retrieves the next sibling only if it matches that selector.
   */

  'next': function () {

  },

  /**
   * nextAll
   * 
   * Get all following siblings of each element in the set of matched elements, optionally filtered by a selector.
   */

  'nextAll': function () {

  },

  /**
   * .nextUntil
   * 
   * Get all following siblings of each element up to but not including the element matched by the selector, DOM node, or jQuery object passed.
   */

  'nextUntil': function () {

  },

  /**
   * prev
   * 
   * Get the immediately preceding sibling of each element in the set of matched elements, optionally filtered by a selector.
   */

  'prev': function () {

  },

  /**
   * prevAll
   * 
   * Get all preceding siblings of each element in the set of matched elements, optionally filtered by a selector.
   */

  'prevAll': function () {

  },

  /**
   * prevUntil
   * 
   * Get all preceding siblings of each element up to but not including the element matched by the selector, DOM node, or jQuery object.
   */

  'prevUntil': function () {

  },

  /**
   * siblings
   * 
   * Get the siblings of each element in the set of matched elements, optionally filtered by a selector.
  */

  'siblings': function () {

  }

});