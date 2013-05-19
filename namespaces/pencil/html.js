
var pencil = require('../../')
  ;

module.exports = pencil.extend({

  render: function () {

    this.name = 'html';

    var lang = this.attr('lang')
      , hasLang = !!lang
      ;
    
    lang = lang || this.params.lang || 'en';

    if (!hasLang) {
      this.attr('lang', lang);
    }

    return this.callParent(arguments);
  }

});

/*
var pencil = require('pencil')
  , Base = pencil.nodes.Custom
  , BaseProto = Base.prototype
  ;

var Html = module.exports = function Tag (node, params) {

  Base.apply(this, arguments);
  
};

// Extends from `pencil.nodes.Custom`

pencil.inherits(Html, Base);

Html.prototype.render = function () {

  this.name = 'html';

  if (!this.attr('lang')) {
    this.attr('lang', this.params.lang || 'en');
  }

  BaseProto.render.call(this);

  return this;
};
*/