/*!
 * Behere
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */	

var UI = require('../../../')
  , cls = UI.cls
  ;

UI.klass.define('bui.tab.tab', {
	
	extend: 'bui.button.button',
	
	type: 'tab',
	
	clsDefault: 'tab',
	
	initialize: function(){	
		this._super.apply(this, arguments);
	},
	
	render: function(){
		this._super.apply(this, arguments);
	}

});	