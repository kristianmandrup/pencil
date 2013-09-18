
var pencil = require('./lib/pencil')
  , path = require('path')
  , $h = pencil.Helper
  ;


//
// Defaults namespaces
//

pencil.use(
  'default'
  //'pencil-bootstrap',
  //path.join(__dirname, '..', 'nando-http', 'app', 'tags', 'nando')
);

var url = path.join(__dirname, 'test.jade')
  ;

pencil.renderFile(url, {}, function (err, data) {
  if (err) console.log(err);
  if (data) console.log(data);
});