
/**
 * Module dependencies.
 */

var jade = require('../').use('default')
  , path = require('path')
  , should = require('should')
  , fs = require('fs');

// test cases

var cases = fs.readdirSync(path.join(__dirname, 'cases')).filter(function(file){
  return ~file.indexOf('.jade');
}).map(function(file){
  return file.replace('.jade', '');
});

cases.forEach(function(test){
  var name = test.replace(/[-.]/g, ' ');
  it(name, function(){
    var uri = './test/cases/' + test + '.jade';
    var str = fs.readFileSync(uri, 'utf8');
    var html = fs.readFileSync('./test/cases/' + test + '.html', 'utf8').trim().replace(/\r/g, '');
    var fn = jade.compile(str, { filename: uri, pretty: true, basedir: './test/cases' });
    var actual = fn({ title: 'Jade' });
    actual.trim().should.equal(html);
  })
});