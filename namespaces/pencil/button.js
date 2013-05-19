
var pencil = require('../../')
  ;

module.exports = pencil.extend({

  render: function () {

    this.name = 'button';

    var type = this.attr('type')
      , hasType = !!type
      ;
    
    type = type || this.params.type || 'button';

    if (!hasType) {
      this.attr('type', type);
    }

    return this.callParent(arguments);
  }

});


/*
var pencil = require('pencil')
  , Base = pencil.nodes.Custom
  , BaseProto = Base.prototype
  ;

var Button = module.exports = function Tag (node, params) {

  Base.apply(this, arguments);

};

// Extends from `pencil.nodes.Custom`

pencil.inherits(Button, Base);

Button.prototype.render = function () {

  this.name = 'button';

  if (!this.attr('type')) {
    this.attr('type', this.params.type || 'button');
  }

  BaseProto.render.call(this);

  return this;
};
*/