
var uubench = require('uubench')
  , pencil = require('./')
  ;

var suite = new uubench.Suite({
  min: 200,
  iterations: 1000000,
  result: function(name, stats){

    var persec = 1000 / stats.elapsed
      , ops = stats.iterations * persec;
    console.log('%s: %d', name, stats.elapsed | 0);
  }
});


var tagName1 = 'bootstrap:form:container';
var tagName2 = 'bootstrap:form:container';

suite.bench('A', function(next){
  var parts = tagName1.split(':')
    , prefix = parts.shift()
    , name = [prefix].concat(parts).join('.')
    ;

  //console.log(prefix, name)
  next();
});

suite.bench('B', function(next){
  var prefix = tagName2.substr(0, tagName2.indexOf(':'))
    , suffix = tagName2.substr(tagName2.indexOf(':'))
    //, reg = new RegExp('^' + prefix + '')
    , name = prefix + suffix;

  //console.log(prefix, name)
  next();
});

//suite.run();


  var name = 'ciaogino'
    , prefix
    , suffix = name.indexOf('.')
    , found
    , ns
    ;

  prefix = name.substr(0, suffix);
  suffix = name.substr(suffix);

  console.log(prefix, suffix)