
/*!
 * pencil
 * Copyright(c) 2013 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var pencil = require('../../../')
  , min = 'production' == process.env.NODE_ENV
  , baseUrl = '/nando/lib/'
  ;

/**
 * Expose.
 */

module.exports = pencil.extend({

  extend: 'pencil.script',

  render: function () {
    
    var library = this.data('library')
      , details = this.data('wildcard')[0];
    
    if ('angular' === library) {
      library = baseUrl + 'angular/angular.min.js';
    }
    else if ('angular-resource' === library) {
      library = baseUrl + 'angular-resource/angular-resource.min.js';
    }
    else if ('angular-router' === library) {
      library = baseUrl + 'angular-ui-router/release/angular-ui-router.min.js';
    }
    else if ('angular-bootstrap' === library) {
      library = baseUrl + 'angular-bootstrap/build/ui-bootstrap-tpls.min.js';
    }
    else if ('ace' === library) {
      details = details || 'ace';
      library = baseUrl + 'ace/build/src-min-noconflict/' + details + '.js';
    }
    else if ('angular-ui-ace' === library) {
      library = baseUrl + 'angular-ui-ace/ui-ace.min.js';
    }
    else if ('codemirror' === library) {
      library = baseUrl + 'codemirror/lib/codemirror.js';
    }
    else if ('angular-ui-codemirror' === library) {
      library = baseUrl + 'angular-ui-codemirror/ui-codemirror.min.js';
    }
    else if ('bootstrap' === library) {
      library = baseUrl + 'bootstrap/js/bootstrap.min.js';
    }
    else if ('html5shiv' === library) {
      library = baseUrl + 'html5shiv/html5shiv.js';
    }
    else if ('html5shiv-printshiv' === library) {
      library = baseUrl + 'html5shiv/html5shiv-printshiv.js';
    }
    else if ('jquery' === library) {
      library = baseUrl + 'jquery/jquery.min.js';
    }
    else if ('jquery-drag' === library) {
      library = baseUrl + 'jquery-drag/jquery.event.drag.js';
    }
    else if ('jquery-drag-live' === library) {
      library = baseUrl + 'jquery-drag/jquery.event.drag.live.js';
    }
    else if ('jquery-drop' === library) {
      library = baseUrl + 'jquery-drop/jquery.event.drop.js';
    }
    else if ('jquery-drop-live' === library) {
      library = baseUrl + 'jquery-drop/jquery.event.drop.live.js';
    }
    else if ('json' === library) {
      library = baseUrl + 'json/json2.min.js';
    }
    else if ('lodash' === library) {
      library = baseUrl + 'lodash/dist/lodash.min.js';
    }
    else if ('require' === library) {
      library = 'require/require.min.js';
      this.attr('data-main', this.attr('src'));
    }
    else if ('restangular' === library) {
      library = baseUrl + 'restangular/dist/restangular.min.js';
    }
    
    this.attr('src', library);

    return this.callParent(arguments);
  }

});