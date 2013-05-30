
var pencil = require('./lib/pencil')
  , path = require('path')
  , $h = pencil.Helper
  ;

//
// Defaults namespaces
//

pencil.use('default');
//pencil.use('pencil-bootstrap');
//pencil.namespace(path.join(__dirname, '..', 'nando-http', 'app', 'custom_tags', 'nando'))

pencil.define('pencil.orca', {

  extend: 'pencil.component',//pencil.nodes.Container, //'pencil.form',

  default: true,

  render: function () {
    
    this.name = 'gg';

    
    this.input1 = pencil.create('pencil:input');
    this.input2 = pencil.create('pencil:input');

    var gino = $h(this.input1, this.input2);

    gino.attr('111', '2222');
    // this.append(gino);


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
