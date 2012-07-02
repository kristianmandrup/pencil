/*!
 * Pencil
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */	

var Pencil = require('../../../')
  ;

/**
 * tab.tab
 */

Pencil.define('pencil.tab.tab', {
	
	extend: 'pencil.button.button',
	
	/**
	 * @property type
	 */
	
	type: 'tab',
	
	/**
	 * @property clsType
	 */
	
	clsType: 'tab',
	
	/**
	 * @method init
	 */
	
	init: function(){
		
		this._super.apply(this, arguments);
	},
	
	/**
	 * @method render
	 */
	
	render: function(){
		
		this._super.apply(this, arguments);
	}

});	