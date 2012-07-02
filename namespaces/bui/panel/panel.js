/*!
 * Behere
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */	

var UI = require('../../../')
  , cls = UI.cls
  ;
	
UI.klass.define('bui.panel.panel', {
	
	extend: 'bui.container.container',
	
	type: 'panel',
	
	clsDefault: 'panel',
	
	/**
	 * @property title
	 */
	
	title: ' ',
	
	/**
	 * @property showHeader
	 */
	
	showHeader: true,
	
	initialize: function(){
		this._super.apply(this, arguments);
		
		var footerCls = cls(this.clsDefault + '-footer');
		
		if(this.showHeader){
	  	this.header = UI.klass.create('bui.panel.header', {
	  	  title: this.title
	  	});
	  }

		this.footer = UI.tag({
		  class: footerCls
		});
		
		this.footerBody = UI.tag({
		  class: footerCls+'-body'
		});
		
		this.footerBody.appendTo(this.footer);
	},
	
	render: function(){
		this._super.apply(this, arguments);

		
		if(this.showHeader){
	  	this.header.render();
	  	this.tag.prepend(this.header.tag)
	  }
		
		this.tag.append(this.footer);
	}
	
});	