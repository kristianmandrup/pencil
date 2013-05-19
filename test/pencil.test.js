
/**
 * Module dependencies.
 */

var jade = require('../')
  , assert = require('assert')
  , fs = require('fs');

// Shortcut

var render = function(str, options){
  var fn = jade.compile(str, options);
  return fn(options);
};

describe('jade', function(){
  describe('.version', function(){
    it('should be valid version format', function(){
      assert.ok(/^\d+\.\d+\.\d+$/.test(jade.version), "Invalid version format");
    });
  });
});