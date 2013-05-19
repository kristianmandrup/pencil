
var pencil = require('../../')
  ;

module.exports = pencil.extend({

  render: function () {

    this.name = 'link';

    this.attr({
      'href': this.attr('href') || this.params.href || '/favicon.ico',
      'type': 'image/x-icon',
      'rel': 'shortcut icon'
    });

    return this.callParent(arguments);
  }

});