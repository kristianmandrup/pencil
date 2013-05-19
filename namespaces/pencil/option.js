
var pencil = require('../../')
  ;

module.exports = pencil.extend({

  render: function () {

    this.name = 'option';

    var label = this.label()
      , hasLabel = !!label
      , value = this.attr('value')
      , hasValue = !!value
      ;

    value = value || this.params.value;

    if (!hasLabel) {
      label = this.params.label || value;
      this.label(label);
    }

    if (!value) {
      value = label;
    }

    if (!hasValue && value) {
      this.attr('value', value);
    }
    
    return this.callParent(arguments);
  }

});