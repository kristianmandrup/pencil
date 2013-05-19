
var pencil = require('../../')
  ;

module.exports = pencil.extend({

  render: function () {

    this.name = 'script';
      
    if (!this.attr('type')) {
      this.attr('type', 'text/javascript');
    }

    return this.callParent(arguments);
  }

});