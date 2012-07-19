/*!
 * Pencil
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

var Pencil = require('../pencil.js')
  , fs = require('fs')
  , path = require('path')
  , _ = require('underscore')
  ;

/**
 * Register
 */

var Register = module.exports = function Register(tagname, fn){
  if(typeof tagname === 'string'){
    if(!fn){
      // Register a namespace
      Register.registerNamespace(tagname);
    }else{
      // Register a single tag
      Register.registerTag(tagname, fn);
    }
  }else if(!fn && tagname instanceof Array){
    // Register multiple namespaces
    for(var i=0; i<tagname.length; i++){
      Register.registerNamespace(tagname[i]);
    }
  }else if(!fn && typeof tagname === 'object'){
    // Register multiple tags
    for(var i in tagname){
      Register.registerTag(i, tagname[i]);
    }
  }
  
  return Register;
};

/**
 * cache.
 */

var Cache = Register.cache = {
  namespaces: {},
  extended: {},
  defaults: [
    'a','abbr','acronym','address','applet','area','article','aside','audio',
    'b','base','basefont','bdi','bdo','big','blockquote','body','br','button',
    'canvas','caption','center','cite','code','col','colgroup','command',
    'datalist','dd','del','details','dfn','dir','div','dl','dt','em','embed',
    'fieldset','figcaption','figure','font','footer','form','frame','frameset',
    'h1','h2','h3','head','header','hgroup','hr','html','i','iframe','img',
    'input','ins','isindex','keygen','kbd','label','legend','li','link','map',
    'mark','menu','meta','meter','nav','noframes','noscript','object','ol',
    'optgroup','option','output','p','param','pre','progress','q','rp','rt',
    'ruby','s','samp','script','section','select','small','source','span',
    'strike','strong','style','sub','summary','sup','table','tbody','td',
    'textarea','tfoot','th','thead','time','title','tr','track','tt','u','ul',
    'var','video','wbr'
  ]
};

/**
 * registerTag
 * Register a single tag
 * 
 * @api private
 */

Register.registerTag = function registerTag(tagname, fn){
  // SINGLE

  var Tag = function(){
    this.keys = [];
    this.params = [];
  };
 
  // Replace a default
  Cache.defaults = _.without(Cache.defaults, tagname);
  
    
  // Register a new tag
  
  var tag = new Tag(); // +++++++++++++++++++++++++++++++++++++++++ CONTROLLARE QUI !!!!
  
  tag.tagname = tagname;
  tag.regexp = Register.tagToRegexp(tagname, tag.keys);
  
  if(typeof fn === 'string'){
    fn = Cache.extended[fn].fn;
  }
  tag.fn = fn;
  
  Cache.extended[tagname] = tag;
};

/**
 * registerNamespace
 * Register a namespace
 * 
 * @api private
 */

Register.registerNamespace = function registerNamespace(dirname){
  var conf = JSON.parse(fs.readFileSync(path.join(dirname, 'namespace.json'), 'utf-8'))
    ;
  
  conf['alias'] = conf['alias'] || {};
  conf['default'] = conf['default'] || false;
  
  Cache.namespaces[conf.name] = conf;
  
  if (conf['default']) {
    Cache.namespaces['default'] = conf.name;
  } 
  
  if(conf.nameAlias){
    if(!(dirname instanceof Array)){
      conf.nameAlias = [conf.nameAlias];
    }
    conf.nameAlias.forEach(function(alias){
      Cache.namespaces[alias] = conf;
    });
  }
  
  // register alias
  for(var al in conf['alias']){
    Register(conf['default'] ? al : (conf['name'] + ':' + al), (function(tagname){
      return function(){

        var tag = Pencil.create(tagname, {
          tag: this
        });
        
        if('function' == typeof tag.render){
          tag.render();
        }
        
        return tag.tag;
      }
    })(conf['alias'][al]));
  }
  
  Pencil.namespace(conf.name, dirname);
  
};

/**
 * 
 */

Register.tagToRegexp = function(path, keys, sensitive, strict) {
  if (path instanceof RegExp) return path;
  if (path instanceof Array) path = '(' + path.join('|') + ')';
  path = path
    .concat(strict ? '' : '/?')
    .replace(/\/\(/g, '(?:/')
    .replace(/\+/g, '__plus__')
    .replace(/(\:)?(\.)?\?(\w+)(?:(\(.*?\)))?(\?)?/g, function(_, slash, format, key, capture, optional){
      keys.push({ name: key, optional: !! optional });
      slash = slash || '';
      return ''
        + (optional ? '' : slash)
        + '(?:'
        + (optional ? slash : '')
        + (format || '') + (capture || (format && '([^:.]+?)' || '([^:]+?)')) + ')'
        + (optional || '');
    })
    .replace(/([\/.])/g, '\\$1')
    .replace(/__plus__/g, '(.+)')
    .replace(/\*/g, '(.*)');
    
  return new RegExp('^' + path + '$', sensitive ? '' : 'i');
};