/*!
 * Pencil
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

var Pencil = require('../../../')
  ;

/**
 * button.button
 */

Pencil.define('pencil.button.button', {
	
	extend: 'pencil.view',
	
	/**
	 * @property type
	 */
	
	type: 'button',
	
	/**
	 * @property clsType
	 */
	
	clsType: 'button',
	
	/**
	 * @method init
	 */
	
	init: function(){
		this._super.apply(this, arguments);
		
		this.body = Pencil.tag('em', {
			class: this.clsType + '-body'
		});
		
		this.button = Pencil.tag('button', {
			class: this.clsType + '-inner',
			type: 'button'
		});
		
		this.text = Pencil.tag('span', {
			class: this.clsType + '-text'
		}).html(this.text);
		
		this.icon = Pencil.tag('span', {
			class: this.clsType + '-icon'
		});
		
		this.button.appendTo(this.body).append(this.text, this.icon);
		
		this.tag.append(this.body)
	},
	
	/**
	 * @method render
	 */
	render: function(){
		
		this._super.apply(this, arguments);
	}

});	