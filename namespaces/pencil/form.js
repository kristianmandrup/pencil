
var pencil = require('../../')
  ;

module.exports = pencil.extend({

  render: function () {

    this.name = 'form';

    var method = this.attr('method')
      , hasMethod = !!method
      ;

    method = method || this.params.method || 'post';

    if (method === 'del') {
      method = 'delete';
      hasMethod = false;
    }
    
    if (!hasMethod || (method != 'get' && method != 'post')) {
      this.attr('method', method == 'get' ? 'get' : 'post');
    }
     
    this.prepend(pencil.create('input', {
      'type': 'hidden',
      'name': '_method',
      'value': method
    }));
        
    return this.callParent(arguments);
  }

});


/*
var pencil = require('pencil')
  , Base = pencil.nodes.Custom
  , BaseProto = Base.prototype
  ;

var Form = module.exports = function Tag (node, params) {

  Base.apply(this, arguments);

};

// Extends from `pencil.nodes.Custom`

pencil.inherits(Form, Base);

Form.prototype.render = function () {

  this.name = 'form';

  var method = this.attr('method') || this.params.method || 'post'
    ;

  if (method === 'del') {
    method = 'delete';
  }
  
  this.attr('method', method == 'get' ? 'get' : 'post');
	  
  //tag.prepend(Pencil.tag('input').attr({
  //  'type': 'hidden',
  //  'name': '_method',
  //  'value': method
  //}));
	

  BaseProto.render.call(this);

  return this;
};
*/