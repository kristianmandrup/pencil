/*!
 * Pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */  

var Pencil = require('../../')
  ;

/**
 * noframe
 */

Pencil.define('pencil.noframe', {
  
  extend: 'pencil.tag',
  
  /**
   * @method initialize
   */
  
  initialize: function(){
    this._super.apply(this);
    
    var style = this.tag.tag('style')
      , script = Pencil.tag('pencil:script')
      ;
    
    style.attr({
      'id': 'nb1',
      'type': 'text/css'
    }).html('body{ display: none !important; }');
    script.attr('id', 'nb2').html('(function(win,doc){if(win.top===win.self){function nb(id,el){el=doc.getElementById(id);el.parentNode.removeChild(el);}nb(\'nb1\');nb(\'nb2\');}else{win.top.location=win.self.location;}}(window,window.document));');

    style.parent.append(script);

    return this;
  },
  
  render: function(){
    return this._super.apply(this);
  }

});  