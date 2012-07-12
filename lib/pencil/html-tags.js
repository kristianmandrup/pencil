/*!
 * Pencil
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

var Pencil = require('./../pencil')
  ;

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
      render: function(){
        
        if(!this.attr('type')){
          this.attr('type', 'button');
        }
        
        return this;
      },
      convert: function(type){
        this
            .tag('button')
            .attr('type', type)
          ;
        return htmlTags.button.render.apply(this);
      }
    }
  , 'button:submit': {
      render: function(){
        return htmlTags.button.convert.apply(this, ['submit']);
      }
    }
  , 'button:reset': {
      render: function(){
        return htmlTags.button.convert.apply(this, ['reset']);
      }
    }
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

        this.name = 'link';
        this.attr({
          'href': this.attr('href') || '/favicon.ico',
          'type': 'image/x-icon',
          'rel': 'shortcut icon'
        });
        
        return this;
      }
    }
  , 'fieldset': {}
  , 'figcaption': {}
  , 'figure': {}
  , 'font': {}
  , 'footer': {}
  , 'form': {
      render: function(){
        var method = this.attr('method');
    
        if (!method) {
          method = 'post';
          this.attr('method', 'post');
        }else if(method != 'get'){
          this.attr('method', 'post');
        }
        
        this.prepend(Pencil.tag('input',{
          'type': 'hidden',
          'name': '_method',
          'value': method
        }));
        
        return this;
      },
      convert: function(method){
        this
            .tag('form')
            .attr('method', method)
          ;
        return htmlTags.form.render.apply(this);
      }
    }
  , 'form:get': {
      render: function(){
        return htmlTags.form.convert.apply(this, ['get']);
      }
    }
  , 'form:post': {
      render: function(){
        return htmlTags.form.convert.apply(this, ['post']);
      }
    }
  , 'form:put': {
      render: function(){
        return htmlTags.form.convert.apply(this, ['put']);
      }
    }
  , 'form:del': {
      render: function(){
        return htmlTags.form.convert.apply(this, ['delete']);
      }
    }
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
      render: function(){
        
        if(!this.attr('type')){
          this.attr('type', 'text');
        }
        
        return this;
      },
      convert: function(type){
        this
            .tag('input')
            .attr('type', type)
          ;
        return htmlTags.input.render.apply(this);
      }
    }
  , 'input:button': {
      render: function(){
        return htmlTags.input.convert.apply(this, ['button']);
      }
    }
  , 'input:checkbox': {
      render: function(){
        return htmlTags.input.convert.apply(this, ['checkbox']);
      }
    }
  , 'input:file': {
      render: function(){
        return htmlTags.input.convert.apply(this, ['file']);
      }
    }
  , 'input:hidden': {
      render: function(){
        return htmlTags.input.convert.apply(this, ['hidden']);
      }
    }
  , 'input:image': {
      render: function(){
        return htmlTags.input.convert.apply(this, ['image']);
      }
    }
  , 'input:password': {
      render: function(){
        return htmlTags.input.convert.apply(this, ['password']);
      }
    }
  , 'input:radio': {
      render: function(){
        return htmlTags.input.convert.apply(this, ['radio']);
      }
    }
  , 'input:reset': {
      render: function(){
        return htmlTags.input.convert.apply(this, ['reset']);
      }
    }
  , 'input:submit': {
      render: function(){
        return htmlTags.input.convert.apply(this, ['submit']);
      }
    }
  , 'input:text': {
      render: function(){
        return htmlTags.input.convert.apply(this, ['text']);
      }
    }
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