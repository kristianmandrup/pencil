
/*!
 * pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var path = require('path')
  ;

/*
 * Run tests
 */

process.argv.push('-u', 'tdd', '-R', 'dot', '-c', './test');

require(path.join(__dirname, 'node_modules', 'mocha', 'bin', 'mocha'));
