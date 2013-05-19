
var pencil = require('../../')
  , path = require('path')
  ;

module.exports = pencil.extend({

  render: function () {
    
    this.name = 'div';
    //this.template(path.join(__dirname, 'noframe.pencil'), {});

    var div1 = pencil.create({oo: '1'});
    var div2 = pencil.create({oo: '2'});
    var div3 = pencil.create({oo: '3'});
    var div4 = pencil.create({oo: '4'});
    var div5 = pencil.create({oo: '5'});
    var ciao = pencil.create({oo: 'ciao'});

    
    this.append(div1);
    this.append(div2);
    this.append(div3);
    this.append(div4);
    this.append(div5);

    div1.appendTo(this);
    div2.appendTo(this);
    div3.appendTo(this);
    div4.appendTo(this);
    div5.appendTo(this);

    div3.after(ciao);

    return this.callParent(arguments);
  }

});