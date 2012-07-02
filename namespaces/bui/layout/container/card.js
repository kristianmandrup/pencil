/*!
 * Behere
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */	

var UI = require('../../../../')
  , cls = UI.cls
  ;
	
UI.klass.define('bui.layout.container.card', {
	
	extend: 'bui.layout.container.container',
	
	type: 'card',
	
	initialize: function(){	
		this._super.apply(this, arguments);
	},
	
	render: function(){	
		this._super.apply(this, arguments);
	}
	
});	