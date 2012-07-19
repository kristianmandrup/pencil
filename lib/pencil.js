/*!
 * Pencil
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

var fs = require('fs')
  , path = require('path')
  , bike = require('bike')
  , jade = require('jade')
  , _ = require('underscore')
  ;

/**
 * Pencil.
 * Inherits from Bike
 * 
 * @tanks https://github.com/behere/bike
 * @api public
 */

var Pencil = module.exports = bike.extend(function Pencil(){
  // Exmpty by now
});

/**
 * Library version.
 */

Pencil.version = '0.1.3';

/**
 * jade.
 */

Pencil.jade = jade;

/**
 * root.
 */

Pencil.root = null; // Dont like it, see if there is a different way to do it

/**
 * nodes.
 */

Pencil.nodes = require('./pencil/nodes');

/**
 * nodes.
 */

//Pencil.state = require('./pencil/state');

/**
 * register
 * 
 * @api public 
 */

var Register = Pencil.register = require('./pencil/register');

/**
 * cache
 * 
 * @api public 
 */

var Cache = Pencil.cache = Register.cache;

/**
 * adapter
 */

Pencil.adapter = function(name, file){
  Pencil.adapter.__defineGetter__(name, function () {
    return Pencil.adapter[name] = require(file);
  });
};

// Loop all adapters
fs.readdirSync(path.join(__dirname, './pencil/adapters')).forEach(function(file){
  var ext = path.extname(file);
  if(ext == '.js'){
    Pencil.adapter(path.basename(file, ext), path.join(__dirname, 'pencil/adapters', file));
  }
});

/**
 * start
 * 
 * @api public
 */
var compile = jade.Compiler.prototype.compile
  , scan = jade.Lexer.prototype.scan
  ;
  
Pencil.start = function(){
  // Compile
  jade.Compiler.prototype.compile = function(){
    
    // Attach state
    //var state = this.node.state = new Pencil.state();
    
    this.node = Pencil.parse(this.node);
    
    //state.emit('fine');
    
    return compile.call(this);
  };
  
  // Scan
  jade.Lexer.prototype.scan = function(regexp, type){
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
};

/**
 * stop
 * 
 * @api public
 */

Pencil.stop = function(){
  // Restore original compile
  jade.Compiler.prototype.compile = compile;
  
  // Restore original scan
  jade.Lexer.prototype.scan = scan;
};

/**
 * id.
 * 
 * @api public
 */
var idCount = null
  ;

Pencil.id = function(prefix){
  if(!idCount || idCount===9999){
    idCount = 1000;
  }
  return (prefix ? (prefix + '-') : cssPrefix) + ++idCount;
};

/**
 * cls.
 * 
 * @api public
 */
var cssPrefix = 'x-'
  ;
  
Pencil.cls = function(cls){
  return cls ? (cssPrefix + cls) : null;
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
  //options.pretty = true;
  options.compileDebug = false;
  options.debug = false;
  options.pretty = false;
  
  return jade.compile(text, options);
};

/**
 * render.
 * 
 * @api public
 */

Pencil.render = function Render(file, options){
  options = options || {};
  
  options.filename = options.filename || path.join(options.root, file);
  
  var str = fs.readFileSync(options.filename, 'utf8')
    , fn = Pencil.compile(str, options)
    ;
    
  return fn(options);
};

/**
 * parse.
 * 
 * @api private
 */

Pencil.parse = function(tag, parent){
  //var state = tag.state || tag.parent.state;
  
  if(parent){
    tag.parent = parent;
  }
    
  if(tag.isBlock){
    
    // Parse children
    _.map(tag.nodes, function(child){
      //child.state = state;
      return Pencil.parse(child);
    });
  
  }else if(tag.isTag){
    
    // HTML tags
    tag = Pencil.tag(tag);
    
    // If NOT a component then parse children
    if(tag.isTag){
      _.map(tag.block.nodes, function(child){
        //child.state = state;
        return Pencil.parse(child, tag);
      });
    }

  }
  
  return tag;
};

/**
 * tag
 * 
 * @api public
 */

Pencil.tag = function(source, attrs){
  // deprecated
  if(attrs){
    throw new Error('Pencil: #tag() cannot accept attrs -> ' + name)
  }
  // /deprecated
  
  if(!source){
    return new Pencil.nodes.Tag('div');
  }
  
  var tagname = 'string' == typeof source ? source : source.name
    , tag = null
    ;    
  
  if(~Cache.defaults.indexOf(tagname)){  //if(_.include(Cache.defaults, tagname)){}
    // Default
    if(source.name){
      tag = source;
    }else{
      tag = new Pencil.nodes.Tag(tagname);  
    }
    
  }else{
    // Extended

    for(var ext in Cache.extended){
      ext = Cache.extended[ext];
      
      //@thanks https://github.com/visionmedia/page.js
      var match = ext.regexp.exec(tagname);
      
      if(match){
        source.params = {
          keys: ext.keys || [],
          values: []
        }
        
        for (var i = 1, len = match.length; i < len; ++i) {
          var key = source.params.keys[i - 1];
    
          var val = 'string' == typeof match[i]
            ? decodeURIComponent(match[i])
            : match[i];
    
          if (key) {
            source.params.values[key.name] = undefined !== source.params.values[key.name]
              ? source.params.values[key.name]
              : val;
          } else {
            source.params.values.push(val);
          }
        }
        
        // CONTROLLARE QUI
        tag = ext.fn.apply(source.name ? source : new Pencil.nodes.Tag(tagname));
        
        break;  
      }
    }    
    
    if(!tag){
      // Find in a namespace
      
      if(source.name){
        tag = source;
      }else{
        tag = new Pencil.nodes.Tag(tagname);
      }
      
      var names = tag.name.split(':')
        , len = names.length
        ;
      
      if(len===1 || !Cache.namespaces[names[0]]){
        // default namespace
        tag.namespace = Cache.namespaces['default'];
        tag.names = names;
      }else{
        // custom namespace
        tag.namespace = names.shift();
        tag.names = names;
      }
      
      var tagName = tag.names.join('.')
        , tagNamespace = Cache.namespaces[tag.namespace];
      
      try{
        var UI = Pencil.create( tagNamespace.name + '.' + tagName, {
          tag: tag
        });
        
        UI.tag.ui = UI;   // To check if it is needed or NOT ???
        
        tag = UI.render().tag;
        
      }catch(e){
        tag = Pencil.tag().html('ERRORE ' + tagname)
      };
    }
    
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

// defaults
Pencil.register([
  path.join(__dirname, '../namespaces/pencil'),
  path.join(__dirname, '../namespaces/bootstrap')
]);
