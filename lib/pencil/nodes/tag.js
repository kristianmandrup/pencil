/*!
 * Pencil
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

var Pencil = require('./../../pencil')
  , path = require('path')
  , fs = require('fs')
  ;

/**
 * splice.
 * 
 * @api private
 */

function splice(args){
  return args ? Array.prototype.slice.call(args) : [];
}

/**
 * command.
 * 
 * @api private
 */

function command(arr, cmd, els){
  for(var i=0; i<els.length; i++){
    arr[cmd](els[i]);
  }
  return this;
};
  
/**
 * escape.
 * 
 * @api private
 */

function escape(value){
  return '"' + value + '"'
}
  
/**
 * unescape.
 * 
 * @api private
 */

function unescape(value){
  return value.replace(/^['"]|['"]$/g, '');
}

/**
 * Tag
 */

var Tag = module.exports = Pencil.jade.nodes.Tag;

/**
 * @property isTag
 */

Tag.prototype.isTag = true;
    
/**
 * @method id
 */

Tag.prototype.id = function(value){
  if(!value){
    return this.getAttr('id');
  }
  
  return this.setAttr('id', value);
};
    
/**
 * @method param
 */

Tag.prototype.param = function(name){
  if(name && this.params){
    return this.params.values[name];  
  }
  return this.params;
};

/**
 * @method sanitize
 */

Tag.prototype.sanitize = function(){
  var me = this
    ;
    
  if(!me.sanitized){
    me.sanitized = true;
    
    var fixed = {}
      , ret = []
      , name
      ;
    
    me.attrs.forEach(function(attr){
      name = attr.name;
      
      attr.val = unescape(attr.val);
      
      if(!fixed[name]){
        fixed[name] = [];
      }
      
      fixed[name].push(attr.val);
    });
    
    for(var name in fixed){
      ret.push({
        name: name,
        val: escape(fixed[name].join(' ')),
        escaped: undefined
      });
    }
    
    me.attrs = ret;  
  }
};
    
/**
 * @method getName
 */

Tag.prototype.getName = function(){
  return this.name;
};
  
/**
 * @method tag
 */

Tag.prototype.tag = function(tag){
  if(!tag){
    return this.name; 
  }
  
  this.name = tag;
  
  return this;
};

/**
 * @method is
 * Check the type of the tag
 */

Tag.prototype.is = function(name){
  return (this.name && this.name === name);
};

/**
 * @method attr
 */

Tag.prototype.attr = function(name, value){
  var me = this
    , attrs = me.attrs
    ;
    
  if(!name && !value){
    return attrs;
  }

  if(typeof name === 'function'){
    // each
    for (var attr, fn, i = 0, len = attrs.length; i < len; ++i) {
      attr = attrs[i];
      if(attr){
        fn = name.call(me, attr.name, unescape(attr.val), i, attrs); 
        if(fn){
          break;
          return fn;
        } 
      }
    };
  }
  
  if(typeof name === 'object'){
    // multiple
    for(var k in name){
      me.attr(k, name[k]);
    }
  }
  
  if(typeof name === 'string'){
    // single
    if(value || (value == null && value !== undefined)){
      me.setAttr(name, value);
    }else{
      return me.getAttr(name);
    } 
  }
  
  return me;
};

/**
 * @method getAttr
 */

Tag.prototype.getAttr = function(name){
  var me = this
    , args = splice(arguments)
    , value = {}
    ;

  args.forEach(function(arg){
    var ret = [];
    
    me.attr(function(n, v){
      if(arg === n){
        return ret.push(v);
      }
    });
    
    value[arg] = ret.join(' ');
  })
  
  if(name){
    if(args.length > 1){
      return value;
    }else{
      return value[name];
    }
  }
    
  return null;
};

/**
 * @method setAttr
 */

Tag.prototype.setAttr = function(name, value){
  value = (value == null && value !== undefined) ? "''" : escape(value);
  return this.removeAttr(name).setAttribute(name, value, true);
};

/**
 * @method removeAttr
 */

Tag.prototype.removeAttr = function(){
  var me = this
    , args = splice(arguments)
    ;
  
  args.forEach(function(arg){
    me.attr(function(n, v, i){
      if(arg === n){
        return me.attrs.splice(i, 1);
      }
    });   
  })
  
  return me;
};
  
/**
 * @method attrToObj
 */

Tag.prototype.attrToObj = function(){
  var ret = {}
    ;
    
  this.attr(function(name, value, index, attrs){
    ret[name] = value;
  });
  
  return ret;
};
  
/**
 * @method addClass
 */

Tag.prototype.addClass = function(){
  var me = this
    , args = splice(arguments)
    , cls = this.getAttr('class')
    ;
    
  if(cls){
    cls = cls.split(' ');
  }else{
    cls = [];
  }
  
  args.forEach(function(arg){
    if(arg){
      //arg = (Pencil.cssPrefix + arg);
      
      if(!~cls.indexOf(arg)){
        cls.push(arg);
      }
    }
  })  
  
  return this.setAttr('class', cls.join(' '));
};
  
/**
 * @method removeClass
 */
  
Tag.prototype.removeClass = function(){
  var me = this
    , args = splice(arguments)
    , cls = me.getAttr('class')
    ;
  
  if(cls){
    args.forEach(function(arg){
      if(arg){
        //arg = (Pencil.cssPrefix + arg);
        
        cls = cls.split(' ').filter(function(cl){
          return (cl !== arg);
        });
      }
    })
    
    me.setAttr('class', cls.join(' '));
  } 
  
  return this
};

/**
 * @method toggleClass
 */

Tag.prototype.toggleClass = function(value){
  return this.hasClass(value) ? this.removeClass(value) : this.addClass(value);
};
  
/**
 * @method hasClass
 */

Tag.prototype.hasClass = function(){
  var me = this
    , cls = me.getAttr('class')
    , args = splice(arguments)
    , count = 0
    ;
  
  if(!cls || args.length === 0){
    return false;
  }
  
  cls = cls.split(' ');
  
  args.forEach(function(arg){
    //arg = (Pencil.cssPrefix + arg);
    
    if(~cls.indexOf(arg)){
      count++;
    } 
  })
  
  return !!(count === cls.length);
};
  
/**
 * @method append
 */

Tag.prototype.append = function(){
  for (var i = 0, len = arguments.length; i < len; i++){
    arguments[i].parent = this;
  }
  return command.call(this, this.children(), 'push', arguments);
};
  
/**
 * @method appendTo
 */

Tag.prototype.appendTo = function(parent){
  this.parent = parent;
  return command.call(this, parent.children(), 'push', [this]);
};
  
/**
 * @method prepend
 */

Tag.prototype.prepend = function(){
  for (var i = 0, len = arguments.length; i < len; i++){
    arguments[i].parent = this;
  }
  return command.call(this, this.children(), 'unshift', arguments);
};
  
/**
 * @method prependTo
 */

Tag.prototype.prependTo = function(parent){
  this.parent = parent;
  return command.call(this, parent.children(), 'unshift', [this]);
};
  
/**
 * @method insertAfter
 * Append a node right after this node as a sibling
 */

Tag.prototype.insertAfter = function(){
  var self = this,
      parent = self.parent,
      args = arguments;
  
  if(parent) {
    parent.children(function(child, i){
      if( child.uid == self.uid ) {
        for (var ii = 0, len = args.length; ii < len; ii++){
          args[ii].parent = parent;
          parent.children().splice( (i+1), 0, args[ii] );
        } 
        // to be implemented: have to break the loop here
      }
    })
  }
  return this;
};
  

/**
 * @method insertAfterTo
 * Append a node right after this node as a sibling
 */

Tag.prototype.insertAfterTo = function(sibling){
  var self = this,
      parent = sibling.parent;
  
  if(parent) {
    parent.children(function(child, i){
      if( child.uid == sibling.uid ) {
        self.parent = parent;
        parent.children().splice( (i+1), 0, self );
        // to be implemented: have to break the loop here
      }
    })
  }
  return this;
};

/**
 * @method insertBefore
 */

Tag.prototype.insertBefore = function(){
  var self = this,
      last = self,
      parent = self.parent,
      args = arguments;
  
  if(parent) {
    parent.children(function(child, i){
      if( child.uid == self.uid ) {
        for (var ii = 0, len = args.length; ii < len; ii++){
          args[ii].parent = parent;
          
          last.replaceWith( args[ii] )
          //args[ii].insertAfter( last );
          last = args[ii];
          //parent.children().splice( (i-1), 0, args[ii] );
        } 
        //last.insertAfter( self );
        // to be implemented: have to break the loop here
      }
    })
  }
  return this;
};

/**
 * @method insertBeforeTo
 */

Tag.prototype.insertBeforeTo = function(sibling){

  return this;
};
  
/**
 * @method show
 */

Tag.prototype.show = function(){
  return this.css('display', 'block');
};

/**
 * @method hide
 */

Tag.prototype.hide = function(){
  return this.css('display', 'none');
};
  
/**
 * @method css
 */
  
Tag.prototype.css = function(name, val){
  
  var obj = {}
    , css = {}
    , style = this.getAttr('style')
    ;
  
  if(style) {
    style = style.split(/\:|\;/);
    for (var i = 0, len = style.length - 1; i < len; i+=2) {
      css[style[i]]=style[i+1];
    };      
  }
  
  style = [];
  
  if(typeof name === 'string' && !val){
    //get
    return css[name] ? css[name].replace(/px/gi, '') : null;
  }
  
  if(typeof name === 'string'){
    //single set
    obj[name] = val;
  }else{
    //multiple set
    obj = name;
  };
  
  Object.keys(obj).forEach(function(rule){
    if(obj[rule]){
      css[rule] = /^([0-9]+)$/.test(obj[rule]) ? obj[rule]+'px' : obj[rule];
    }
  });
  
  Object.keys(css).forEach(function (rule) {
    style.push(rule + ':' + css[rule] + ';' );
  });
  
  if(style.length > 0){
    this.setAttr('style', style.join(''));
  }
  
  return this;
};
  
/**
 * @method replaceWith
 */
  
Tag.prototype.replaceWith = function( replaceWith ) {
  var self = this,
      parent = self.parent;

  if(parent) {
    if(parent.name){
      // tag
      parent.children(function(child, i){
        if( self.uid == child.uid ) {
          replaceWith.parent = parent;
          parent.children().splice(i,1,replaceWith)
          return true
        }
      })  
    }else{
      // root tag
      
      for(var i=0; i<self.parent.nodes.length; i++){
        if(self.parent.nodes[i].uid == self.uid){
          self.parent.nodes.splice(i,1,replaceWith)
          break
        }
      }
    };

  }
  return replaceWith
};

/**
 * @method template
 */

Tag.prototype.template = function Template(tag, file, options){
  //console.dir(arguments.callee.caller)
  var text = fs.readFileSync(file, 'utf8')
    , ast = new Pencil.jade.Parser(text, file, _.extend({
        layout: false
      }, options))
    , node = ast.parse()
    ;

  if(tag.index, tag.parent && tag.parent.nodes){
    node = Pencil.parse(node, tag.parent);
    
    tag.parent.nodes.splice(tag.index, 1, node);
  }
  
  return node;
};

/**
 * @method hasChilden
 */

Tag.prototype.hasChilden = function(){
  return (this.block && this.block.nodes && this.block.nodes.length > 0)
};
  
/**
 * @method children
 */

Tag.prototype.children = function(fn){
  if(!fn && this.block){
    return this.block.nodes
  }else if(fn && this.hasChilden()){
    for(var i=0;i<this.block.nodes.length;i++){
      this.block.nodes[i].index = i;
      //this.block.nodes[i].parent = this;
      
      fn.call(this, this.block.nodes[i], i, this.block.nodes)
    }
  }
  
  return this;
};
  
/**
 * @method empty
 */

Tag.prototype.empty = function(){
  
  this.block = new Pencil.nodes.Block();
  
  return this;
};
  
/**
 * @method clear
 */

Tag.prototype.clear = function(){
  
  this.empty();
  
  this.attrs = [];
  
//    if(this.text){
    this.text = new Pencil.jade.nodes.Text(this.line);
    //***this.text.push('');
    //this.text = {nodes: ['']};  
//    }   
  
  return this;
};
  
/**
 * @method html
 */

Tag.prototype.html = Tag.prototype.text = function( val ) {
  
  if(!val) return ((this.text && this.text.nodes && this.text.nodes.length > 0 ) ? this.text.nodes[0] : 'r');
  
  /*
  this.text = {
    nodes: [val]
  };
  */
  if(this.block && this.block.nodes){
    this.block.nodes.push(new Pencil.jade.nodes.Text(val))
  }
  return this;
};
  
/**
 * @method unwrap
 * Remove the parents of the set of matched elements from the DOM, leaving the matched elements in their place.
 */

Tag.prototype.unwrap = function( val ) {
  
  return this;
};
  
/**
 * @method wrap
 * Wrap an HTML structure around each element in the set of matched elements.
 */
  
Tag.prototype.wrap = function( node ) {
  var clone = this.clone();

  this.name = node.name;
  this.attrs = node.attrs;
  this.block = node.block;
  this.line = node.line;
  this.textOnly = node.textOnly;
  
  this.append(clone);
  
  return clone
};
  
/**
 * @method wrapAll
 * Wrap an HTML structure around all elements in the set of matched elements.
 */

Tag.prototype.wrapAll = function(  ) {
  
  return this;
};
    
/**
 * @method wrapInner
 * Wrap an HTML structure around the content of each element in the set of matched elements.
 */
  
Tag.prototype.wrapInner = function( node ) {
  node.setBlock( this.getBlock() ); 
  this.block = new Pencil.nodes.Block();
  this.append(node);
  return this;
};
    
/**
 * @method clone
 */

/*
Tag.prototype.clone = function() {
  return this.clone()
};
*/
  
/**
 * @method remove
 */

Tag.prototype.remove = function() {   
  if(!this.parent && !this.index) return false;
  this.parent.block.nodes.splice( this.index, 1 );
  
  return this;
};
