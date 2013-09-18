
/*!
 * pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var pencil = require('../pencil')
  , namespace = require('./namespace')
  , jade = require('jade')
  , util = require('./utils')
  , path = require('path')
  , noConflict = {
    Parser: pencil.Parser,
    resolvePath: pencil.Parser.prototype.resolvePath
  }
  ;

/**
 * Expose `Parser`.
 *
 * @api public
 */

var Parser = exports = module.exports = function (str, filename, options) {

  this.state = options;
  
  noConflict.Parser.apply(this, arguments);
};

util.inherits(Parser, noConflict.Parser);


Parser.prototype.parseTag = jade.Parser.prototype.parseTag = function(){
  // ast-filter look-ahead
  var i = 2;
  if ('attrs' == this.lookahead(i).type) ++i;
  var tok = this.advance();

  var solved = pencil.resolve(tok.val)
    , tag = solved.tag
    , params = solved.params
    , ast = null
    ;

  tag = new tag(tok.val, null, params, this);
  
  // template replacer
  if (tag._tmplAST) {
    ast = tag._tmplAST;
  }
  else {    
    tag.selfClosing = tok.selfClosing;

    ast = this.tag(tag);

    // if (tag.render) {
    //   tag.render();
    // }
  }


  return ast;
};


Parser.prototype.resolvePath = jade.Parser.prototype.resolvePath = function (uri, purpose) {
  var prefix = null;

  if (uri[0] === '@') {
    if ('.jade' != path.extname(uri)) uri += '.jade';
    
    uri = uri.split('/');

    prefix = uri.shift();
    prefix = prefix.substr(1);
    prefix = namespace.map[prefix];
    prefix = namespace.namespaces[prefix];

    uri.unshift(prefix.directory);

    return path.join.apply(null, uri);
  }
  else {
    return noConflict.resolvePath.call(this, uri, purpose);
  }
  
};


/**
 * parse.
 *
 * @api public
 */

Parser.prototype.parse = function () {
  var block = noConflict.Parser.prototype.parse.apply(this, arguments)
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
      node.name = 'document';
      state.document = node;
    }
    
    if (pencil.isBlock(node)) {
      // block
      util.forEach(node.nodes, function (el, index) {
        reParse(el, parent || state.document, node, index);
      });
    }
    else if (pencil.isTag(node)) {
      // tag
      realParent.nodes[index] = node;

      reParse(node.block, node, node);
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
    // else if (pencil.isMixin(node)) {}
    // else if (pencil.isDoctype(node)) {}
    // else if (pencil.isFilter(node)) {}
    // else if (pencil.isText(node)) {}
    // else if (pencil.isLiteral(node)) {}
    // else if (pencil.isComment(node)) {}
    // else if (pencil.isBlockComment(node)) {}
    else {
      // unknow
      throw new Error('Node type does not exist.');
    }
  }
  
  reParse(block);

  pencil.loopTags(block, function (tag) {
    tag.render();
  });

  return block;
};