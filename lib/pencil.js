/*!
 * Pencil
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

var fs = require('fs')
  , path = require('path')
  , bike = require('bike') //(typeof behere !== 'undefined') ? behere.klass : require('bike')
  , jade = require('jade')
  ;

/**
 * Pencil.
 *
 * @api public
 */

var Pencil = exports = module.exports = function Pencil(){};

// Extend Pencil with Bike
// https://github.com/behere/bike
bike.extend(Pencil);

/**
 * Library version.
 */

Pencil.version = '0.1.1';

/**
 * jade.
 */

Pencil.jade = jade;

/**
 * root.
 */

Pencil.root = null;
/**
 * Parser.
 */

Pencil.Parser = require('./pencil/parser');

/**
 * nodes.
 */

Pencil.nodes = require('./pencil/nodes');

/**
 * htmlTags.
 */

Pencil.htmlTags = require('./pencil/html-tags');

/**
 * Attach to attachToExpress
 * 
 * @api public
 */
Pencil.attach = function(options){
  var express = options.express || require('express')
    , server = options.server
    ;
  
  if(express){
    server.configure(function(){
      server.set('view engine', 'jade');
      server.set('views', options.views ? options.views : path.dirname(module.parent.filename) + '/view');
      // Support for Expressjs 
      if(express.version.substring(0, 1)==='3'){
        // Express 3.x.x
        server.engine('.jade', Pencil.jade.__express);  
      }else{
        // Express 2.x.x
        server.register('.jade', Pencil);
      }
      
      server.use(express.static(path.join(__dirname, '../static/min')));
    });
  }
  
  if(options.root){
    Pencil.root = options.root;
  }
};

/**
 * compile.
 * 
 * @api public
 */

Pencil.compile = function Compile(text, options){
  options = options || {};
  // Self set filename option to be used with ExpressJs
  options.filename = options.filename || path.join(options.root, 'layout.jade');

  return Pencil.jade.compile(text, options);
};

/**
 * render.
 * 
 * @api public
 */

Pencil.render = function Render(file, options){
  options = options || {};
  
  options.filename = options.filename || path.join(options.root, file);
  options.pretty = true;
  
  var str = fs.readFileSync(options.filename, 'utf8')
    ,  fn = Pencil.compile(str, options)
    ;
    
  return fn(options);
};

/**
 * override Pencil.jade.Compiler.prototype.compile
 * 
 * @api private
 */

var compile = Pencil.jade.Compiler.prototype.compile;
Pencil.jade.Compiler.prototype.compile = function(){
  /*
  this.node.nodes.forEach(function(node){
    if(node.name === 'panel'){
      console.dir(node.block.nodes)
    }
  })
  */
  this.node = Pencil.parse(this.node);
  
  return compile.call(this);
};

/**
 * parse.
 * 
 * @api private
 */

Pencil.parse = function(tag, parent){
  if(tag.nodes){
    // root, root of include, or else, anyway not a node
    tag.nodes.forEach(function(child, i){
      tag.nodes[i] = Pencil.parse(child);
    });
  
  }else if(tag.name==='stylus'){
  
  }else if(tag.name){
    // HTML tags
    if(parent) tag.parent = parent;
    
    var htmlTag = Pencil.htmlTags[tag.name];
    
    if(htmlTag){
      // Html tag to be fixed with default properties (ex: style, script)
      // and some new ones (ex: favicon)
      if(htmlTag.hasOwnProperty('render')){
        tag = htmlTag.render.call(tag);  
      }

      // Parse child nodes
      if(tag.block && tag.block.nodes){
        tag.block.nodes.forEach(function(child, i){
          tag.block.nodes[i] = Pencil.parse(child, tag);
        });
      }
    
    }else{
      // Pencil tags
      // Parsing child nodes will be handled within the Pencil tag according to its needs
      
      tag = (new Pencil.Parser(tag)).tag;
      
    }
    
  }else{
    // others, stil have to figure out what are these ???
    // functions, codes ???
  }
  
  return tag;
};

/**
 * override Pencil.jade.Lexer.prototype.scan
 * 
 * @api private
 */

var scan = Pencil.jade.Lexer.prototype.scan;

Pencil.jade.Lexer.prototype.scan = function(regexp, type){
  var tok = scan.apply(this, arguments);
  
  if(tok && (tok.type === 'include' || tok.type === 'extends')){
    if(tok.val.indexOf('@') != -1){
      if(!Pencil.root) throw new Error('Pencil.root has to be defined');
      var split = tok.val.split('@');
      tok.val = path.join('../../../../../../../../../../', Pencil.root, split[1], 'views', split[0]);
    }
  }

  return tok;
};

/**
 * namespaces.
 * 
 * @api public
 */

Pencil.namespaces = {};

/**
 * ns.
 * 
 * @api public
 */

Pencil.ns = function(dir, isDefault){
  var ns = {}
    ;
    
  try{
    ns = JSON.parse(fs.readFileSync(path.join(dir, 'namespace.json'), 'utf-8'))
  }catch(e){};
  
  ns.alias = ns.alias || {};
  
  Pencil.namespaces[ns.name] = ns;
  
  if(ns.nameAlias){
    if(Object.prototype.toString.call(dir) != '[object Array]'){
      ns.nameAlias = [ns.nameAlias];
    }
    ns.nameAlias.forEach(function(alias){
      Pencil.namespaces[alias] = ns;
    });
  }
  
  Pencil.namespace(ns.name, dir);
  
  if (isDefault) {
    Pencil.namespaces.isDefault = ns.name;
  }
};

// defaults
Pencil.ns(path.join(__dirname, '../namespaces/pencil'), true);
//Pencil.ns(path.join(__dirname, '../namespaces/bui'));
Pencil.ns(path.join(__dirname, '../namespaces/bootstrap'));

/**
 * cssPrefix.
 * 
 * @api public
 */

Pencil.cssPrefix = 'x-';

/**
 * id.
 * 
 * @api public
 */

var idCount = null;

Pencil.id = function(prefix){
  if(!idCount || idCount===9999){
    idCount = 1000;
  }
  return (prefix ? (prefix + '-') : Pencil.cssPrefix) + ++idCount;
};

/**
 * cls.
 * 
 * @api public
 */

Pencil.cls = function(cls){
  return cls ? (Pencil.cssPrefix + cls) : null;
};

/**
 * tag
 * 
 * @api public
 */

Pencil.tag = function(name, attrs){
  if(typeof name !== 'string'){
    attrs = name;
    name = 'div';
  }
  
  var tag = new Pencil.nodes.Tag(name || 'div');
  
  if(attrs){
    tag.attr(attrs);
  }
  
  return tag;
};

/**
 * block
 * 
 * @api public
 */

Pencil.block = function(node){
  return new Pencil.nodes.Block(node);
};
