/*!
 * Pencil
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */  

var Pencil = require('../../')
  , path = require('path')
  ;

/**
 * form
 */

Pencil.define('pencil.captcha', {
  
  extend: 'pencil.tag',
  
  /**
   * @method initialize
   */
  
  initialize: function(){
    this._super.apply(this);
    
    var tag = this.tag.tag('ext')
      , key = tag.param('key') || ''
      ;
    
    
    var script_1 = Pencil
          .tag('script')
          .text('var RecaptchaOptions = {theme: "custom", custom_theme_widget: "recaptcha_widget"};')
      , widget = Pencil
          .tag('div')
          .id("recaptcha_widget")
          //.hide()
          
          .append(
            Pencil.tag('div').id("recaptcha_image"),
            Pencil.tag('div').addClass("recaptcha_only_if_incorrect_sol").text('Incorrect please try again'),
            Pencil.tag('span').addClass("recaptcha_only_if_image").text('Enter the words above:'),
            Pencil.tag('span').addClass("recaptcha_only_if_audio").text('Enter the numbers you hear:'),
            Pencil.tag('input').attr({
              type: 'text',
              name: 'recaptcha_response_field',
              id: 'recaptcha_response_field'
            }),
            Pencil.tag('a').attr({
              href: 'javascript:Recaptcha.reload()'
            }).text("Get another CAPTCHA"),
            
            Pencil.tag('div').addClass("recaptcha_only_if_image")
              .append(
                Pencil.tag('a').attr({
                  href: 'javascript:Recaptcha.switch_type(\'audio\')'
                }).text("Get an audio CAPTCHA")
              ),
            
            Pencil.tag('div').addClass("recaptcha_only_if_audio")
              .append(
                Pencil.tag('a').attr({
                  href: 'javascript:Recaptcha.switch_type(\'image\')'
                }).text("Get an image CAPTCHA")
              ),
            
            Pencil.tag('div')
              .append(
                Pencil.tag('a').attr({
                  href: 'javascript:Recaptcha.showhelp()'
                }).text("Help")
              )
          )
      , script_2 = Pencil.tag('script').attr('src', 'http://www.google.com/recaptcha/api/challenge?k='+key)
      ;
    

    
    tag.append(
      script_1,
      widget,
      script_2
    );
    
    tag.prepend(Pencil.tag('h3').text('CAPTCHA 3'));
    
   
    
    if(tag.is('ext')){
      tag.tag('div');
    }

    Pencil.template(tag, path.join(__dirname, 'captcha.jade'), {
        layout: false
    }); 
    
    return this;
  },
  
  render: function(){
    return this._super.apply(this);
  }

});  