/**
 * EXPRESSjs example 
 */

var express = require('express')
  , pencil = require('pencil')
  ;

var app = express.createServer();

pencil.attach({
  express: express,
  server: app
});

app.configure(function(){
  app.set('views', __dirname + '/view');
});

app.get('/', function(req, res, next){
  res.render('text.jade', {
    layout: false
  });
});

app.listen(3000);