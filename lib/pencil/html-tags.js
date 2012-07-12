/*!
 * Pencil
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

var Pencil = require('./../pencil')
  ;


function alias(tag){
  var args = Array.prototype.slice.call(arguments, 1);
  
  return {
    render: function(){
      return htmlTags[tag].render.apply(this, args);
    }
  }
};

/**
 * Exports.
 */

var htmlTags = module.exports = {
    'a': {}
  , 'abbr': {}
  , 'acronym': {}
  , 'address': {}
  , 'applet': {}
  , 'area': {}
  , 'article': {}
  , 'aside': {}
  , 'audio': {}
  , 'b': {}
  , 'base': {}
  , 'basefont': {}
  , 'bdi': {}
  , 'bdo': {}
  , 'big': {}
  , 'blockquote': {}
  , 'body': {}
  , 'br': {}
  , 'button': {
      render: function(type){
        if(!this.attr('type')){
          this.attr('type', type || 'button');
        }
        return this.tag('button');
      }
    }
  , 'button:submit':  alias('button', 'submit')
  , 'button:reset':   alias('button', 'reset')
  , 'canvas': {}
  , 'caption': {}
  , 'center': {}
  , 'cite': {}
  , 'code': {}
  , 'col': {}
  , 'colgroup': {}
  , 'command': {}
  , 'datalist': {}
  , 'dd': {}
  , 'del': {}
  , 'details': {}
  , 'dfn': {}
  , 'dir': {}
  , 'div': {}
  , 'dl': {}
  , 'dt': {}
  , 'em': {}
  , 'embed': {}
  , 'favicon': {
      render: function(){
        this.attr({
          'href': this.attr('href') || '/favicon.ico',
          'type': 'image/x-icon',
          'rel': 'shortcut icon'
        });
        return this.tag('link');
      }
    }
  , 'fieldset': {}
  , 'figcaption': {}
  , 'figure': {}
  , 'font': {}
  , 'footer': {}
  , 'form': {
      render: function(method){
        if(method){
          this.attr('method', method == 'get' ? 'get' : 'post');
        }else{
          method = this.attr('method');  
        }
        
        if(!method){
          method = 'post';
          this.attr('method', method);
        }
        
        this.prepend(Pencil.tag('input',{
          'type': 'hidden',
          'name': '_method',
          'value': method
        }));
        
        return this.tag('form');
      }
    }
  , 'form:get':   alias('form', 'get')
  , 'form:post':  alias('form', 'post')
  , 'form:put':   alias('form', 'put')
  , 'form:del':   alias('form', 'delete')
  , 'frame': {}
  , 'frameset': {}
  , 'h1': {}
  , 'h2': {}
  , 'h3': {}
  , 'head': {}
  , 'header': {}
  , 'hgroup': {}
  , 'hr': {}
  , 'html': {
      render: function(){
        if(!this.attr('lang')){
          this.attr('lang', 'en');
        }
        return this;
      }
    }
  , 'i': {}
  , 'iframe': {}
  , 'img': {}
  , 'input': {
      render: function(type){
        if(!this.attr('type')){
          this.attr('type', type || 'text');
        }
        return this.tag('input');
      }
    }
  , 'input:button':   alias('input', 'button')
  , 'input:checkbox': alias('input', 'checkbox')
  , 'input:file':     alias('input', 'file')
  , 'input:hidden':   alias('input', 'hidden')
  , 'input:image':    alias('input', 'image')
  , 'input:password': alias('input', 'password')
  , 'input:radio':    alias('input', 'radio')
  , 'input:reset':    alias('input', 'reset')
  , 'input:submit':   alias('input', 'submit')
  , 'input:text':     alias('input', 'text')
  , 'ins': {}
  , 'isindex': {}
  , 'keygen': {}
  , 'kbd': {}
  , 'label': {}
  , 'legend': {}
  , 'li': {}
  , 'link': {}
  , 'map': {}
  , 'mark': {}
  , 'menu': {}
  , 'meta': {}
  , 'meter': {}
  , 'nav': {}
  , 'noframes': {}
  , 'noscript': {}
  , 'object': {}
  , 'ol': {}
  , 'optgroup': {}
  , 'option': {}
  , 'output': {}
  , 'p': {}
  , 'param': {}
  , 'pre': {}
  , 'progress': {}
  , 'q': {}
  , 'rp': {}
  , 'rt': {}
  , 'ruby': {}
  , 's': {}
  , 'samp': {}
  , 'script': {
      render: function(){
        
        if(!this.attr('type')){
          this.attr('type', 'text/javascript');
        }
        
        return this;
      }
    }
  , 'section': {}
  , 'select': {}
  , 'small': {}
  , 'source': {}
  , 'span': {}
  , 'strike': {}
  , 'strong': {}
  , 'style': {
      render: function(){
        if(this.attr('href')){
          // inside the header
          this.name = 'link';
          this.attr({
            'type': 'text/css',
            'rel': 'stylesheet'
          });
        }else{
          // inside the body
          this.attr('type', 'text/css');
        }
        
        return this;
      }
    }
  , 'sub': {}
  , 'summary': {}
  , 'sup': {}
  , 'table': {}
  , 'tbody': {}
  , 'td': {}
  , 'textarea': {}
  , 'tfoot': {}
  , 'th': {}
  , 'thead': {}
  , 'time': {}
  , 'title': {}
  , 'tr': {}
  , 'track': {}
  , 'tt': {}
  , 'u': {}
  , 'ul': {}
  , 'var': {}
  , 'video': {}
  , 'wbr': {}
};