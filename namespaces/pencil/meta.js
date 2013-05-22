
/*!
 * pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var pencil = require('../../')
  ;

/**
 * Expose.
 */

module.exports = pencil.extend({

  render: function () {

    this.name = 'meta';

    var type = this.params.type;

    if (type) {  
      if ('charset' == type) {
        this.attr('charset', 'utf-8');
      }
      else if ('chromeframe' == type) {
        this.attr({
          'http-equiv': 'X-UA-Compatible',
          'content': 'IE=Edge,chrome=1'
        });
      }
    }

    return this.callParent(arguments);
  }

});