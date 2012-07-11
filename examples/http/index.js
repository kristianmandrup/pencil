/**
 * HTTP example 
 */

var http = require('http')
  , fs = require('fs')
  , pencil = require('pencil')
  ;

http.createServer(function (req, res) {

  var path = __dirname + '/text.jade'
    , str = fs.readFileSync(path, 'utf8')
    , fn = pencil.compile(str, { filename: path, pretty: true })
    ; 

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(fn({ var1: 'data1', var2: 'data2' }));

}).listen(3000);