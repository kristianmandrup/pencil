
var express = require('express')
  , app = express()
  , pencil = require('../../').use('default')
  ;


app.engine('jade', pencil.__express);  
app.set('view engine', 'jade');

app.get('/', function (req, res, next) {
  res.render('home.jade', {
    ciao: 'CIAOOOOOOOOOO'
  });
});

app.listen(3005);