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
          .id('recaptcha_widget')
          //.hide()
          
          .append(
            

            Pencil.tag('div').addClass('control-group')
              .append(

                Pencil.tag('label').addClass('control-label').text('Prove you\'re not a robot'),

                Pencil.tag('div').addClass('img-polaroid').id('recaptcha_image'),
                Pencil.tag('div').addClass('recaptcha_only_if_incorrect_sol').text('Incorrect please try again'),
                Pencil.tag('span').addClass('help-block', 'recaptcha_only_if_image').text('Type the two pieces of text:'),
                Pencil.tag('span').addClass('help-block', 'recaptcha_only_if_audio').text('Type what you hear:'),
                

                Pencil.tag('div').addClass('controls', 'controls-row')
                  .append(

                    Pencil.tag('input').addClass('span2').attr({
                      type: 'text',
                      name: 'recaptcha_response_field',
                      id: 'recaptcha_response_field'
                    }),

                    Pencil.tag('div').addClass('btn-group', 'span2')
                      .append(

                        Pencil.tag('a').addClass('btn').attr({
                          href: 'javascript:Recaptcha.reload()'
                        }).append(Pencil.tag('div').addClass('icon-repeat')),
                        
                        Pencil.tag('a').addClass('btn', 'recaptcha_only_if_image').attr({
                          href: 'javascript:Recaptcha.switch_type(\'audio\')'
                        }).append(Pencil.tag('div').addClass('icon-volume-up')),
                        
                        Pencil.tag('a').addClass('btn', 'recaptcha_only_if_audio').attr({
                          href: 'javascript:Recaptcha.switch_type(\'image\')'
                        }).append(Pencil.tag('div').addClass('icon-eye-open')),
                        
                        Pencil.tag('a').addClass('btn').attr({
                          href: 'javascript:Recaptcha.showhelp()'
                        }).append(Pencil.tag('div').addClass('icon-info-sign'))

                      )

                  )
              )
          )
      , script_2 = Pencil.tag('script').attr('src', 'https://www.google.com/recaptcha/api/challenge?k='+key)
      ;
    

    
    tag.append(
      script_1,
      widget,
      script_2
    );
    
    //tag.prepend(Pencil.tag('h3').text('CAPTCHA 3'));
    
   
    
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