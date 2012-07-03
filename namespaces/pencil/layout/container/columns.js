/*!
 * Pencil
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */  

var Pencil = require('../../../../')
  ;

/**
 * layout.container.columns
 */

Pencil.define('pencil.layout.container.columns', {
  
  extend: 'pencil.layout.container.container',
  
  /**
   * @property type
   */
  
  type: 'columns',
  
  /**
   * @method initialize
   */
  
  initialize: function(){
    this._super.apply(this, arguments);
    
    this.columns        = this.owner.columns        || false;
    this.columnsFluid    = this.owner.columnsFluid    || false;
    this.columnsPrefix  = this.owner.columnsPrefix  || false;
    this.columnsSuffix  = this.owner.columnsSuffix  || false;
    this.columnsAlpha    = this.owner.columnsAlpha    || false;
    this.columnsOmega    = this.owner.columnsOmega    || false;      
    
    //this.tag.addClass(this.clsType + '-columns');
    
    if(this.columns){
      this.tag.addClass(this.clsType + '-columns-' + this.columns)
    }else{
      this.tag.addClass(this.clsType + '-columns-full')
    }
    
    if(this.columnsFluid){
      this.tag.addClass(this.clsType + '-columns-fluid')
    }

    if(this.columnsPrefix){
      this.tag.addClass(this.clsType + '-columns-prefix-' + this.columnsPrefix)
    }
    
    if(this.columnsSuffix){
      this.tag.addClass(this.clsType + '-columns-suffix-' + this.columnsSuffix)
    }
    
    if(this.columnsAlpha){
      this.tag.addClass(this.clsType + '-columns-alpha')
    }
    
    if(this.columnsOmega){
      this.tag.addClass(this.clsType + '-columns-omega')
    }
    
  },
  
  /**
   * @method render
   */
  
  render: function(){
    var me = this;
    
    this._super.apply(this, arguments);
    
    if(this.owner.items){
      this.owner.items.children(function(tag){
        
        //tag.addClass(me.clsType + '-item');
        
        if(tag.ui){
        var columnWidth   = tag.ui.columns        || false
            , columnPrefix  = tag.ui.columnPrefix || false
            , columnSuffix  = tag.ui.columnSuffix || false
            , columnPush    = tag.ui.columnPush   || false
            , columnPull    = tag.ui.columnPull   || false
            , columnAlpha   = tag.ui.columnAlpha  || false
            , columnOmega   = tag.ui.columnOmega  || false
            ;
          
          if(columnWidth){
            tag.addClass(me.clsType + '-item-' + columnWidth)
          }
          else{
            tag.addClass(me.clsType + '-item-full')
          }
          
          if(columnPrefix){
            tag.addClass(me.clsType + '-item-prefix-' + columnPrefix)
          }
          
          if(columnSuffix){
            tag.addClass(me.clsType + '-item-suffix-' + columnSuffix)
          }

          if(columnPush){
            tag.addClass(me.clsType + '-item-push-' + columnPush)
          }
          
          if(columnPull){
            tag.addClass(me.clsType + '-item-pull-' + columnPull)
          }
          
          if(columnAlpha){
            tag.addClass(me.clsType + '-item-alpha')
          }
          
          if(columnOmega){
            tag.addClass(me.clsType + '-item-omega')
          }
        }
        
      })
    }
    
    this.tag.append(Pencil.tag().addClass('clearfix'));
  }

});  