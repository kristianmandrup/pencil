/*!
 * Pencil
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

var EventEmitter2 = require('eventemitter2').EventEmitter2
  , util = require('util')
  ;
  
/**
 * State
 */

var State = module.exports = function State(){
  EventEmitter2.call(this);
  
  this.setMaxListeners(20);
};

State.prototype = {};

util.inherits(State, EventEmitter2);