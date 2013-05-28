
/*!
 * pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var pencil = require('../pencil')
  , util = require('util')
  , jade = require('jade')
  ;

/**
 * Expose `Parser`.
 *
 * @api public
 */

var Parser = module.exports = function (str, filename, options) {
  this.state = options;

  Parser.super_.apply(this, arguments);
};

util.inherits(Parser, jade.Parser);

/**
 * parse.
 *
 * @api public
 */

Parser.prototype.parse = function () {
  var block = Parser.super_.prototype.parse.apply(this, arguments)
    , state = this.state || {}
    ;

  function reParse (node, parent, realParent, index) {
    node.state = state;
    //node.tid = pencil.tid();  //moved to Tag

    if(parent){
      node.parent = parent;
      node.realParent = realParent;
    }
    else {
      state.document = node;
      state.document.name = 'document';
    }
    
    if (pencil.isBlock(node)) {
      // block
      for (var i = 0; i < node.nodes.length; i++) {
        reParse(node.nodes[i], parent || state.document, node, i);
      };
    }
    else if (
         pencil.isTag(node)
      || pencil.isCustom(node)
    ) {
      // tag
      realParent.nodes[index] = node = pencil.create(node);

      if (!pencil.isComponent(node)) {
        reParse(node.block, node, node);
      }
    }
    else if (
         pencil.isNode(node)
      || pencil.isEach(node)
      || pencil.isCode(node)
      || pencil.isCase(node)
    ) {
      // node / each / code / case
      node.block && reParse(node.block, parent || node, node);
    }
    //else if (pencil.isMixin(node)) {}
    //else if (pencil.isDoctype(node)) {}
    //else if (pencil.isFilter(node)) {}
    //else if (pencil.isText(node)) {}
    //else if (pencil.isLiteral(node)) {}
    //else if (pencil.isComment(node)) {}
    //else if (pencil.isBlockComment(node)) {}
    else {
      // the rest
      throw new Error('Node type does not exist.');
      //for(el in pencil.nodes){
      //  console.log('== ' + el, (node instanceof pencil.nodes[el]) + '')
      //}
    }
  }
  
  reParse(block);

  pencil.walkThrough(block, function (node, nodes, index) {
    node.render();
  }, function (tag) {
    return !tag.isRendered || tag.isChanged;
  });

  return block;
};