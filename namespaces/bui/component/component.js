/*!
 * Behere
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */ 

var UI = require('../../../')
  , cls = UI.cls
  ;

UI.klass.define('bui.component.component', {
  
  __init: 'initialize',
  
  mixins: [
   'bui.component.dimensions',
   'bui.component.traverse',
  ],
  
  /**
   * @property isComponent
   */
  
  isComponent: true,
  
  /**
   * @property type
   */
  
  type: 'component',
  
  /**
   * @property tagName
   */
  
  tagName: 'div',
  
  /**
   * @property clsDefault
   */
  
  clsDefault: 'component',
  
  /**
   * @property cls
   */
  
  cls: null,
  
  /**
   * @property content
   */
  
  content: null,
  
  /**
   * @method initialize
   */
  
  initialize: function(){
    var me = this;
    
    if(!this.id) {
      this.id = UI.id(this.type)
    }
    
    // Tag
    this.tag = this.tag || UI.tag();
    
    // Sanitize initial nodes from Jade
    this.tag.sanitize();
    
    // Manage content
    this.content = (!this.content) ? [] : [this.content];
    
    // Register attributes
    me.tag.attr(function(name, value){
      me[name] = value      
    });
    
    // Parse child nodes
    this.tag.children(function(child){
      if(child.nodes){
        //text
        //me.content.push(el.nodes)
      }else if(child.val){
        me.content.push(child.val);
      }else if(child.name ===' content'){
        //text
        if(child.text){
          me.content.push(child.text.nodes);
        }
        child.children(function(subchild){
          if(subchild.nodes){
            me.content.push(subchild.nodes);    
          }
        })
      }else{
        me[child.name] = child;  
      }
    });
    
    this.tag
      .clear()
      .tag(this.tagName || 'div')
      .attr('id', this.id)
      .addClass(this.class, this.cls, cls(this.clsDefault || this.type))
    ;
    
    return this;
  },
  
  /**
   * @method render
   */
  
  render: function(){
    return this;
  }

}); 