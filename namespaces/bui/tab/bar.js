/*!
 * Behere
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */	

var UI = require('../../../')
  , cls = UI.cls
  ;
	
UI.klass.define('bui.tab.bar', {
	
	extend: 'bui.panel.header',
	
	type: 'tabbar',
	
	clsDefault: 'tabbar',
	
	defaultType: 'bui.tab.tab',
	
	/**
	 * @property position
	 */
	
	position: 'top',	//top,bottom,left,right
	
	initialize: function(){
		this._super.apply(this, arguments);
		
		var barCls = cls('tabbar');
		
		this.strip = UI.tag('div', {
		  class: barCls+'-strip'
		})
		
		this.tag.addClass(barCls+'-'+this.position);
	},
	
	render: function(){
		var me = this;
		
		this._super.apply(this, arguments);
		
		this.tag.append(this.strip)
		
		this.owner.items.children(function(item){			
			if(item.ui){
				me.owner.tabBar.add({
					text: item.ui.title
				})
			}
		});		
	}
	
});	