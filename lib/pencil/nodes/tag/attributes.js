
/*!
 * pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var pencil = require('../../../pencil')
  , utils = require('../../utils')
  ;

/**
 * Expose.
 *
 * @api public
 */

module.exports = {
  
  /**
   * clear
   */

  'clear': function(){
    this.attrs = [];
    return this;
  },

  /**
   * addClass
   * Adds the specified class(es) to each of the set of matched elements.
   */

  'addClass': function () {
    var me = this
      , args = utils.slice(arguments)
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
  },

  /**
   * removeClass
   * Remove a single class, multiple classes, or all classes from each element in the set of matched elements.
   */

  'removeClass': function () {
    var me = this
      , args = utils.slice(arguments)
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
  },

  /**
   * toggleClass
   * Add or remove one or more classes from each element in the set of matched elements, depending on either the class’s presence or the value of the switch argument.
   */

  'toggleClass': function (value) {
    return this.hasClass(value) ? this.removeClass(value) : this.addClass(value);
  },

  /**
   * hasClass
   * 
   */

  'hasClass': function () {
    var me = this
      , cls = me.getAttr('class')
      , args = utils.slice(arguments)
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
  },

  /**
   * css
   * Get the value of a style property for the first element in the set of matched elements or set one or more CSS properties for every matched element.
   */

  'css': function (name, val){
  
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
  },

  /**
   * show
   * Show the matched elements.
   */

  'show': function () {
    return this.css('display', 'block');
  },

  /**
   * hide
   * Hide the matched elements.
   */

  'hide': function () {
    return this.css('display', 'none');
  },

  /**
   * toggle
   * Display or hide the matched elements.
   */

  'toggle': function () {
    
  },

  /**
   * attr
   * Get the value of an attribute for the first element in the set of matched elements or set one or more attributes for every matched element.
   */

  'attr': function (name, value) {
    if (!name) {
      return this.attrs;
    }

    if (value) {
      this.setAttr(name, value);
    }
    else if ('string' === typeof name) {
      return this.getAttr(name);
    }
    else if('function' === typeof name) {
      for (var i = 0; i < this.attrs.length; i++) {
        var ret = name.call(
          this,
          this.attrs[i].name,
          utils.unescape(this.attrs[i].val),
          i,
          this.attrs
        );

        if (!ret && 'boolean' === typeof ret) {
          break;
        }
      }
    }
    else {
      for(var i in name){
        this.setAttr(i, name[i]);
      }
    }

    return this;
  },

  /**
   * getAttr
   * 
   */

  'getAttr': function (name) {
    if (!name) {
      return null;
    }

    if (1 === arguments.length) {
      return utils.unescape(this.getAttribute(name));
    }
    else {
      var ret = {}
        , args = utils.slice(arguments)
        ;

      for (var i = 0; i < this.attrs.length; i++) {
        if (~args.indexOf(this.attrs[i].name)) {
          ret[this.attrs[i].name] = utils.unescape(this.attrs[i].val);
        }
      };

      return ret;
    }
  },

  /**
   * setAttr
   * 
   */

  'setAttr': function (name, value) {
    this.removeAttr(name);

    if (pencil.isCode(value)) {
      value.name = name;
      this.attrs.push(value);
    }
    else {
      this.setAttribute(name, utils.escape(value || ''), true);
    }

    return this;
  },

  /**
   * removeAttr
   * Remove an attribute from each element in the set of matched elements.
   */

  'removeAttr': function () {
    var ret = []
      , args = utils.slice(arguments)
      ;

    for (var i = 0; i < this.attrs.length; i++) {
      if (!~args.indexOf(this.attrs[i].name)) {
        ret.push(this.attrs[i]);
      }
    };

    this.attrs = ret;

    return this;
  },

  /**
   * enable
   *
   */

  'enable': function () {
    
  },

  /**
   * disable
   *
   */

  'disable': function () {
    
  },

  /**
   * val
   * Get the current value of the first element in the set of matched elements or set the value of every matched element.
   */

  'val': function (value) {
    return value ? this.setAttr('value', value) : this.getAttr('value');
  },
  
  /**
   * label
   */

  'label': function (val) {
    
    if (arguments.length == 0) {
      // get
      if (this.code) {
        return this.code;
      }

      if (!this.hasChildren()) {
        return null;
      }
      if (pencil.isText(this.block.nodes[0])) {
        return this.block.nodes[0].val;
      }
    }
    else if (val) {
      // set
      if (pencil.isCode(val)) {
        this.code = val;
        // remove text tag
        if (this.hasChildren() && pencil.isText(this.block.nodes[0])) {
          this.block.nodes[0].remove();
        }
      }
      else {
        if (this.hasChildren() && pencil.isText(this.block.nodes[0])) {
          this.block.nodes[0].val = val;
        }
        else {
          this.append(new pencil.nodes.Text(val));
        }
      }
    }

    return this;
  },

  /**
   * html
   * Get the HTML contents of the first element in the set of matched elements or set the HTML contents of every matched element.
   */

  'html': function () {
    
  },

  /**
   * text
   * Get the combined text contents of each element in the set of matched elements, including their descendants, or set the text contents of the matched elements.
   */

  'text': function () {
    
  }

};