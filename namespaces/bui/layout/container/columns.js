/*!
 * Behere
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */  

var UI = require('../../../../')
  , cls = UI.cls
  ;
  
UI.klass.define('bui.layout.container.columns', {
  
  extend: 'bui.layout.container.container',
  
  type: 'columns',
  
  initialize: function(){
    this._super.apply(this, arguments);
    
    var columnsCls = cls(this.clsDefault+'-columns');
    
    this.columns        = this.owner.columns        || false;
    this.columnsFluid    = this.owner.columnsFluid    || false;
    this.columnsPrefix  = this.owner.columnsPrefix  || false;
    this.columnsSuffix  = this.owner.columnsSuffix  || false;
    this.columnsAlpha    = this.owner.columnsAlpha    || false;
    this.columnsOmega    = this.owner.columnsOmega    || false;      
    
    //this.tag.addClass(this.clsDefault + '-columns');
    
    if(this.columns){
      this.tag.addClass(columnsCls+'-'+this.columns);
    }else{
      this.tag.addClass(columnsCls+'-full');
    }
    
    if(this.columnsFluid){
      this.tag.addClass(columnsCls+'-fluid');
    }

    if(this.columnsPrefix){
      this.tag.addClass(columnsCls+'-prefix-'+this.columnsPrefix);
    }
    
    if(this.columnsSuffix){
      this.tag.addClass(columnsCls+'-suffix-'+this.columnsSuffix);
    }
    
    if(this.columnsAlpha){
      this.tag.addClass(columnsCls+'-alpha');
    }
    
    if(this.columnsOmega){
      this.tag.addClass(columnsCls+'-omega');
    }
  },
  
  render: function(){
    var me = this;
    
    this._super.apply(this, arguments);
    
    var itemCls = cls(this.clsDefault+'-item');
    
    if(this.owner.items){
      this.owner.items.children(function(tag){
        
        //tag.addClass(me.clsDefault + '-item');
        
        if(tag.ui){
          var columnWidth    = tag.ui.columns        || false
            , columnPrefix  = tag.ui.columnPrefix  || false
            , columnSuffix  = tag.ui.columnSuffix  || false
            ,  columnPush    = tag.ui.columnPush    || false
            ,  columnPull    = tag.ui.columnPull    || false
            , columnAlpha   = tag.ui.columnAlpha    || false
            , columnOmega   = tag.ui.columnOmega    || false
            ;
          
          if(columnWidth){
            tag.addClass(itemCls+'-'+columnWidth);
          }
          else{
            tag.addClass(itemCls+'-full');
          }
          
          if(columnPrefix){
            tag.addClass(itemCls+'-prefix-'+columnPrefix);
          }
          
          if(columnSuffix){
            tag.addClass(itemCls+'-suffix-'+columnSuffix);
          }

          if(columnPush){
            tag.addClass(itemCls+'-push-'+columnPush);
          }
          
          if(columnPull){
            tag.addClass(itemCls+'-pull-'+ columnPull);
          }
          
          if(columnAlpha){
            tag.addClass(itemCls+'-alpha');
          }
          
          if(columnOmega){
            tag.addClass(itemCls+'-omega');
          }
        }
        
      })
    }
    
    this.tag.append(UI.tag({
      class: cls('clearfix')
    }));
  }

});  