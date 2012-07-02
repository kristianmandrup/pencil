/*!
 * Pencil
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

var Pencil = require('./../pencil')
	,	path = require('path')
	;

/**
 * Initialize Parser.
 */

var Parser = exports = module.exports = function Parser(tag){
	this.originalTag = tag;
	this.tag = tag;
	
	this.detectName();
	
	return this.parse();
};

/**
 * Parser prototype.
 */

Parser.prototype = {
	
	/**
   * detectName.
   */
  
	detectName: function(){
		var names = this.tag.name.split(':')
			,	len = names.length
			;
		
		if(len===1 || !Pencil.namespaces[names[0]]){
			// default namespace
			this.tag.namespace = Pencil.namespaces.isDefault;
			this.tag.names = names;
		}else{
			// custom namespace
			this.tag.namespace = names.shift();
			this.tag.names = names;
		}
		
	},
	
  /**
   * parse.
   */
  
	parse: function(){
		
		var tagName = this.tag.names.join('.')
			,	tagNamespace = Pencil.namespaces[this.tag.namespace];
		
		// check for alias
		if(tagNamespace.alias && tagNamespace.alias[tagName]){
			tagName = tagNamespace.alias[tagName];
		}
		
		var tagUI = Pencil.create( tagNamespace.name + '.' + tagName, {
			tag: this.tag
		});
		
		tagUI.tag.ui = tagUI;
		
		return tagUI.render();
		
		//this.tag = tagUI.tag; 
	}
	
};