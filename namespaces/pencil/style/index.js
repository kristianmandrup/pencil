
/*!
 * pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var pencil = require('../../../')
  ;

/**
 * Expose.
 */

module.exports = pencil.define('pencil.style', {

  extend: 'pencil.custom',

  render: function () {

    var source = this.data('href') || this.attr('href') || this.attr('src')
      , hasSource = !!source
      , attrs = { 'type': 'text/css' }
      ;
      
    if(hasSource){
      this.removeAttr('href', 'src');
    }

    if (hasSource && this.parent && 'head' == this.parent.name) {
      this.name = 'link';
      attrs.rel = 'stylesheet';
      if (hasSource) {
        attrs.href = source;
      }
    }
    else {
      this.name = 'style';
    }

    this.attr(attrs);

    return this.callParent(arguments);
  }

});