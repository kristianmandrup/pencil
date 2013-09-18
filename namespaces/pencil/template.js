
/*!
 * pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var pencil = require('../../')
  , path = require('path')
  , fs = require('fs')
  ;


function merge (a, b) {
  for (var key in b) a[key] = b[key];
  return a;
};


/**
 * Expose.
 */

module.exports = pencil.define('pencil.template', {

  template: null,
  template: path.join(__dirname, 'template.jade'),

  //extend: 'pencil.custom',

  constructor: function Tag (name, block, params, parser) {

    // jade.Parser.parseBlock

    var me = this
      , options = {}
      , ast = null
      , tmplParser = null
      ;

    if (!me.template) {
      // if not template is given return the child elements or an empty block
      if ('indent' == parser.peek().type) {
        ast = parser.block();
      }
      else {
        ast = new pencil.nodes.Block;
      }

      return me._tmplAST = ast;
    }

    tmplParser = new pencil.Parser(
      fs.readFileSync(me.template, 'utf8'),
      me.template,
      parser.options
    );

    tmplParser.blocks = merge({}, parser.blocks);
    tmplParser.mixins = parser.mixins;

    parser.context(tmplParser);

    ast = tmplParser.parse();

    parser.context();
    
    ast.filename = me.template;

    if ('indent' == parser.peek().type) {
     ast.includeBlock().push(parser.block());
    }

    return me._tmplAST = ast;
  }

});