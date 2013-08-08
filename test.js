
var pencil = require('./lib/pencil')
  , path = require('path')
  , $h = pencil.Helper
  ;


//
// Defaults namespaces
//

pencil.use(
  'default',
  'pencil-bootstrap',
  path.join(__dirname, '..', 'nando-http', 'app', 'tags', 'nando')
)

var url = path.join(__dirname, 'test.jade')
  ;

pencil.renderFile(url, {}, function (err, data) {
  if (err) console.log(err);
  if (data) console.log(data);
});




var Bike = require('bike')
  , Class = Bike.Class
  ;

var MyClass = Class.extend({
  ciao:'l'
});

var MyClass2 = MyClass.extend('gg', {
  gino: function () {
    return this.run();
  },
  run: function (n) {
    return '-0-' + n;
  }

});

var MyClass3 = MyClass2.extend('gg2', {
  run: function () {
    return '-1-' + this.callParent('rrr');
  }
});

var orca = {
  gino: function () {
    return this.run();
  }
};



var myclass = new MyClass3;

console.dir(myclass.gino());
console.dir(MyClass3.name);


var Biky = Bike();

var Test_1 = Biky.define('t1', {
  ciao:'l',
  constructor: function (n, ff) {
    console.log('ciao ' + this.ciao + ' ' + n.s);
  },
  testina: '1111111111',
  run: function () {}
});

var Test_2 = Biky.define('t2', {
  extend: Test_1
});

var gg = new Test_2({
  s:'cd'
});

console.dir(gg.testina);
console.dir(gg.run);