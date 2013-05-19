
var pencil = require('../../')
  ;

module.exports = pencil.extend({

  render: function () {

    this.name = 'input';

    var type = this.attr('type')
      , hasType = !!type
      , name = this.attr('name')
      , hasName = !!name
      , value = this.attr('value')
      , hasValue = !!value
      ;
    
    type = type || this.params.type || 'text';
    name = name || this.params.name;
    value = value || this.params.value;

    if (!hasType) {
      this.attr('type', type);
    }

    if (!hasName && name) {
      this.attr('name', name);
    }

    if (!hasValue && value) {
      this.attr('value', value);
    }

    return this.callParent(arguments);
  }

});

/*
var pencil = require('pencil')
  , Base = pencil.nodes.Custom
  , BaseProto = Base.prototype
  ;

var Input = module.exports = function Tag (node, params) {

  Base.apply(this, arguments);

};

// Extends from `pencil.nodes.Custom`

pencil.inherits(Input, Base);

Input.prototype.render = function () {

  this.name = 'input';

  if (!this.attr('type')) {
    this.attr('type', this.params.type || 'button');
  }

  if (!this.attr('name') && this.params.name) {
    this.attr('name', this.params.name);
  }

  if (!this.attr('value') && this.params.value) {
    this.attr('value', this.params.value);
  }

  BaseProto.render.call(this);

  return this;
};
*/