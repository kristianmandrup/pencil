
var pencil = require('./lib/pencil')
  , nando = require('../nando/lib2/nando')
  , path = require('path')
  , $h = pencil.Helper
  ;

//
// Defaults namespaces
//

pencil.use(
  'default'
);

var url = path.join(__dirname, 'test.jade')
  ;

pencil.renderFile(url, {}, function (err, data) {
  if (err) console.log(err);
  if (data) console.log(data);
});