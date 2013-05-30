
/*!
 * pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var pencil = require('../../pencil')
  , utils = require('../utils')
  ;

//

function handleClass (tags, classes, proceed, fn) {
  var cls
    , clsBefore
    , i
    ;

  classes = utils.slice(classes);

  return tags.each(function () {
    cls = clsBefore = this.getAttr('class');

    if (proceed || cls) {
      cls = cls ? cls.split(' ') : [];

      for (i = 0; i < classes.length; i++) {
        if (false === fn.call(this, i, classes[i], cls)) {
          break;
        };
      } 

      if (clsBefore !== (cls = cls.join(' '))) {
        this.setAttr('class', cls);
      }
    }
  });
};

//

function showHide (tags, show) {
  var style
    , match
    , toggle = arguments.length === 1
    , ret
    ;

  return tags.each(function () {
    style = this.getAttr('style');

    if (style) {
      match = style.match(/display(\s?)+\:(\s?)+(block|none)(\s?)+\;/i);
    }

    style = style || '';

    if (!match) {
      ret = (toggle || !show) ? 'none' : 'block';
    }
    else {
      if (toggle) {
        ret = ('block' == match[3]) ? 'none' : 'block';
      }
      else {
        ret = !show ? 'none' : 'block';
        
        if (match[3] == ret) {
          return; // no need for changes
        }
      }
    };

    ret = 'display:' + ret + ';';

    if (!match) {
      style += ret;
    }
    else {
      style = style.replace(match[0], ret);
    }

    this.setAttr('style', style);
  });
};

//

function addAttribute (name, value) {
  if (pencil.isCode(value)) {
    value.name = name;
    this.attrs.push(value);
  }
  else {
    this.attrs.push({
      name: name,
      val: utils.escape(value || ''),
      escaped: true
    });
  }
};

//

function attr (elem, name, value) {

  // first: get all
  if (1 === arguments.length) {
    return elem.attrs;
  }
  else if (2 === arguments.length) {
    // first: get
    if ('string' === typeof name) {
      for (var i = 0; i < elem.attrs.length; ++i) {
        if (elem.attrs[i] && elem.attrs[i].name == name) {
          return utils.unescape(elem.attrs[i].val);
        }
      }
    }
    // all: set object
    else {
  
      // single
      for (var _name in name) {
        addAttribute.call(elem, _name, name[_name]);
      };

    }
  }
  // all: set key/value
  else if (3 === arguments.length) {

      addAttribute.call(elem, name, value);
  
  }

  return elem;
}

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
    return this.each(function () {
      this.attrs = [];
    });
  },

  /**
   * addClass
   * Adds the specified class(es) to each of the set of matched elements.
   */

  'addClass': function () {
    return handleClass(this, arguments, true, function(i, arg, cls){
      if(arg && !~cls.indexOf(arg)){
        cls.push(arg);
      }
    });
  },

  /**
   * removeClass
   * Remove a single class, multiple classes, or all classes from each element in the set of matched elements.
   */

  'removeClass': function () {
    return handleClass(this, arguments, false, function(i, arg, cls){
      cls.splice(cls.indexOf(arg), 1);
    });
  },

  /**
   * toggleClass
   * Add or remove one or more classes from each element in the set of matched elements, depending on either the class’s presence or the value of the switch argument.
   */

  'toggleClass': function () {
    return handleClass(this, arguments, true, function(i, arg, cls){
      if(~cls.indexOf(arg)){
        cls.splice(cls.indexOf(arg), 1);  
      }
      else {
        cls.push(arg);
      }
    });
  },

  /**
   * hasClass
   * 
   */

  'hasClass': function () {
    var count = 0
      ;

    handleClass(this, arguments, false, function(i, arg, cls){
      if (~cls.indexOf(arg)) {
        count++;
        return true;
      }
      return false;
    });
    
    return !!(count === (this.length * arguments.length));
  },

  /**
   * css
   * Get the value of a style property for the first element in the set of matched elements or set one or more CSS properties for every matched element.
   */

  'css': function (name, val, secure){
    var obj = {}
      , css = {}
      , styleBefore = this.getAttr('style')
      , styleAfter = []
      , rule
      , i
      ;
    
    if (styleBefore) {
      styleBefore = styleBefore.split(/\:|\;/);
      
      for (i = 0; i < styleBefore.length - 1; i+=2) {
        css[styleBefore[i]] = styleBefore[i+1];
      };      
    };
    
    if('string' === typeof name){
      // single get
      if (arguments.length === 1) {
        return css[name] ? css[name].replace(/px/gi, '') : null;
      }
      // single set
      obj[name] = val;
    }else{
      // multiple set
      obj = name;
    };
    
    if (!secure) {
      Object.keys(obj).forEach(function (name) {
        rule = obj[name]; 
        if(rule || (!isNaN(parseFloat(rule)) && isFinite(rule))) {
          css[name] = /^([0-9]+)$/.test(rule) ? rule+'px' : rule;
        }
      });
    };
    
    Object.keys(css).forEach(function (name) {
      styleAfter.push(name + ':' + css[name] + ';' );
    });
    
    if (styleAfter.length > 0) {
      this.setAttr('style', styleAfter.join(''));
    };
    
    return this;
  },

  /**
   * show
   * Show the matched elements.
   */

  'show': function () {
    return showHide(this, true);
  },

  /**
   * hide
   * Hide the matched elements.
   */

  'hide': function () {
    return showHide(this, false);
  },

  /**
   * toggle
   * Display or hide the matched elements.
   */

  'toggle': function () {
    return showHide(this);
  },

  /**
   * attr
   * Get the value of an attribute for the first element in the set of matched elements or set one or more attributes for every matched element.
   */

  'attr': function (name, value) {
    // first: get all
    if (0 === arguments.length) {
      return this[0].attrs;
    }
    else if (1 === arguments.length) {
      // first: get
      if ('string' === typeof name) {
        for (var i = 0; i < this[0].attrs.length; ++i) {
          if (this[0].attrs[i] && this[0].attrs[i].name == name) {
            return utils.unescape(this[0].attrs[i].val);
          }
        }
      }
      // all: set object
      else {
        if (1 === this.length) {
          // single
          for (var _name in name) {
            addAttribute.call(this[0], _name, name[_name]);
          };
        }
        else{
          // multiple
          for (var _name in name) {
            this.each(function () {
              addAttribute.call(this, _name, name[_name]);
            });
          }
        }
        return this;
      }
    }
    // all: set key/value
    else if (2 === arguments.length) {
      return this.each(function () {
        addAttribute.call(this, name, value);
      });
    }
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

      return undefined;
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

      return this;
    }
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