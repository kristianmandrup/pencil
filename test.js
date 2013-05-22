
var pencil = require('./lib/pencil')
  , path = require('path')
  ;

//
// Defaults namespaces
//

pencil.use('default');
pencil.use('pencil-bootstrap');
pencil.namespace(path.join(__dirname, '..', 'nando-validator', 'app', 'tags', 'nando'))

pencil.define('pencil.orca', {

  extend: 'pencil.custom',//pencil.nodes.Container, //'pencil.form',

  default: true,

  render: function () {
    this.name = 'r';
    this.callParent();
    

    return this;
  }

});


var url = path.join(__dirname, 'test.jade')
  ;

pencil.renderFile(url, {}, function (err, data) {
  if (err) console.log(err);
  if (data) console.log(data);
});
