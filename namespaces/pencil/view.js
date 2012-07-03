/*!
 * Pencil
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */  

var Pencil = require('../../')
  ;

/**
 * view
 */

Pencil.define('pencil.view', {
  
  /**
   * @property type
   */
  
  type: 'view',
  
  /**
   * @property owner
   */
  
  owner: null,
  
  /**
   * @property isComponent
   */
  
  isComponent: true,
  
  /**
   * @property clsType
   */
  
  clsType: 'view',
  
  /**
   * @property clsCustom
   */
  
  clsCustom: '',
  
  /**
   * @property content
   */
  
  content: '',
  
  /**
   * @method initialize
   */
  
  initialize: function(){
    var me = this;
    
    if(!this.id) {
      this.id = Pencil.id(this.type)
    }
    
    this.tag = this.tag || Pencil.tag();
    
    // Manage text
    if(this.content===''){
      this.content = new Array()
    }else{
      this.content = new Array(this.content)
    }
    
    //if(this.tag.text){
    //  this.content.push(this.tag.text.nodes)
    //}
    
    // Register attributes
    this.tag.attr(function(el){
      me[el.name] = el.val      
    })
    
    // Register child nodes
    this.tag.children(function(el){
      if(el.nodes){
        //text
        //me.content.push(el.nodes)
      }else if(el.val){
        me.content.push(el.val)
      }else if(el.name==='content'){
        //text
        if(el.text){
          me.content.push(el.text.nodes)
        }
        el.children(function(con){
          if(con.nodes){
            me.content.push(con.nodes)    
          }
        })
      }else{
        me[el.name] = el  
      }
    })
    
    // Clear and set tag element
    this.tag
      .clear()
      .tag('div')
      .attr('id', this.id)
      .addClass(this.clsType || this.type)
    ;
    
    if(this.clsCustom && this.clsCustom !== ''){
      this.tag.addClass(this.clsCustom)
    }
    
    return this;
  },
  
  /**
   * @method render
   */
  
  render: function(){
    var me = this;
    
    return this;
  }

});  