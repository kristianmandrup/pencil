/*!
 * Pencil
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

var path = require('path')
  , Pencil = require('../../pencil')
  ;

module.exports = function(express, server, options){
  express = express || require('express');
  options = options || {};

  if(express){

    Pencil.start();
    
    server.configure(function(){
      server.set('view engine', 'jade');
      server.set('views', options.views ? options.views : path.dirname(module.parent.parent.filename) + '/view');

      if(express.version.substring(0, 1)==='3'){
        // Express 3.x.x
        server.engine('.jade', jade.__express);  
      }else{
        // Express 2.x.x
        server.register('.jade', Pencil);
      }
      
      //server.use(express.static(path.join(__dirname, '../static/min')));
    });
  }
  
  if(options.root){
    Pencil.root = options.root;
  }
    
  return function(req, res, next){
    next();
  };
};
