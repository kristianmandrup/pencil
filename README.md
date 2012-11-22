> ![Stage](https://github.com/gabrieleds/behere.github.com/raw/master/assets/stage/testing.png)  
[![Build Status](https://secure.travis-ci.org/gabrieleds/pencil.png)](http://travis-ci.org/gabrieleds/pencil)

> version 0.1.4 (testing) - [History](https://github.com/gabrieleds/pencil/blob/master/HISTORY.md)

# Pencil
  
Are you working with [Jade](https://github.com/visionmedia/jade)? Do you want to make __custom tags__? Pencil is built on top of Jade to add extra features:

  * Create custom tags
  * Use jquery like functions to manipulate tags
  * ~~[Bootstrap](http://twitter.github.com/bootstrap/) support~~ (not yet)
  * Extends Jade's *include* and *extends*

## Installation

Install this using `npm` as follows

    $ npm install pencil

## Quick Start

### Use default http server

```javascript
var http = require('http')
  , fs = require('fs')
  , pencil = require('pencil')
  ;

http.createServer(function (req, res) {
  
  var path = __dirname + '/text.jade'
    , str = fs.readFileSync(path, 'utf8')
    , fn = pencil.compile(str, { filename: path, pretty: true })
    ; 
  
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(fn({}));
  
}).listen(3000);
```

### Use Express

Supports Express 2.x and 3.x

```javascript
var express = require('express')
  , pencil = require('pencil')
  ;

var app = express.createServer();

app.configure(function(){
  app.use(pencil.express(express, app));
});

app.get('/', function(req, res, next){
  res.render('text.jade', {
    layout: false
  });
});

app.listen(3000);
```

Pencil configures your [Express](http://expressjs.com/) server with defaults:

  - `*.jade` files are associated to the Jade parser
  - views are located in the `./view` folder of your project

To use your own configuration:

```javascript
app.use(pencil.express(express, app, {
  views: '/path/to/my/views'  // optional
}));
```

## Extended html tags

Pencil extends a few html tags to have default attributes.

```jade
html
// <html lang='en'></html>
```
```jade
favicon
// <link href='/favicon.ico' type='image/x-icon' rel='shortcut icon' />

favicon(href='/image.ico')
// <link href='/image.ico' type='image/x-icon' rel='shortcut icon' />
```
```jade
head
  style(href='/style.css')
// <head>
//   <link href='/style.css' type='text/css' rel='stylesheet' />
// </head>

style
// <style type='text/css'></style>
```
```jade
script
// <script type="text/javascript"></script>

script(src='/script_path')
// <script type="text/javascript" scr="/script_path"></script>
```
```jade
form(action='/action_path')
// <form type='post' action='/action_path'>
//   <input type='hidden' name='_method' value='post' />
// </form>

form(method='put',action='/action_path')
// <form type='post' action='/action_path'>
//   <input type='hidden' name='_method' value='put' />
// </form>

// Alias
form:get
form:post
form:put
form:del
```
```jade
input
// <input type="text" />

// Alias
input:button
input:checkbox
input:file
input:hidden
input:image
input:password
input:radio
input:reset
input:submit
input:text
```

```jade
button
// <button type="button"></button>

// Alias
button:submit
button:reset
```
## Custom tags

__FROM NOW ON THE DOCUMENTATION IS NOT READY YET__

The main purpose of Pencil is to build custom tags. Using [Bike](https://github.com/behere/bike) this comes very easy.

/example.jade
```jade
foo:box
// <div class='box'>Title Undefined</div>

foo:box(title='This is a box')
// <div class='box'>This is a box</div>
```

/foo/box.js
```javascript
var Pencil = require('pencil');

Pencil.define('foo.box', {

  initialize: function(){
    var self = this
      ;
    
    this.tag
      .tag('div')
      .addClass('box')
      .html(this.title || 'Title Undefined')
    ;
  },
  
  render: function(){
    return this;
  }
  
});
```

### How to

First you need to define a namespace.

```javascript
Pencil.ns(__dirname + '/foodir');
```

The above code will look in the given directory for a file named `namespace.json`, the configuration of your namespace.

Attributes of the json file are:

  * __name__: [string] tells Jade's syntax to search any tag starting with the prefix `name:*` in the /foodir directory.
  * __nameAlias__: [string] alias for the name
  * __alias__: [object] key/value of alias for your custom tags used as shortcuts

```
foo:panel(title='Hello World')
```

This for examples searches the file `/foodir/panel.js`.

Optionally you could set your namespace as default to avoid the use of the prefix

```javascript
Pencil.ns(__dirname + '/foodir', true);
```

Now you could do this:

```
panel(title='Hello World')
```
Every given attribute will be passed to the custom tag object.

Additionals elements in the tag name will be considered as subdirectories

```
foo:container:panel:header
=> /foodir/container/panel/header.js
```

### Make one

/foodir/container.js

```javascript
var Pencil = require('pencil');

Pencil.define('foo.container', {

  initialize: function(){
    var me = this;
    
    this.tag
      .tag('div')
      .html('Hello World')
  },
  
  render: function(){
    return this;
  }
  
});
```

Now inside your control you have the variable `this.tag`, this is the Jade Tag Object that you can manipulate as you like with the below functions (Extended Tag Object)

```
foo:container
=> <div>Hello World</div>
```

Since Pencil uses [Bike](https://github.com/behere/bike) it very easy to extend your custom controls

/foodir/panel.js

```javascript
var Pencil = require('pencil');

Pencil.define('foo.panel', {
  
  extend: 'foo.container',
  
  initialize: function(){
    this._super.apply(this, arguments);
    
    this.tag.addClass('panel');
  }
  
});
```

```
foo:panel
=> <div class='panel'>Hello World</div>
```

__For working and complex examples take a look at the /namespaces folder__.


## Extended Tag object

Jade's Tag object is extended with more methods to manipulate it in a jQuery like style.

This is very usefull when building __custom controls__ or [filters](https://github.com/visionmedia/jade/blob/master/examples/nested-filters.js)

  * isTag
  * ~~sanitize~~
  * getName
  * tag
  * is
  * attr
  * ~~getAttr~~
  * ~~setAttr~~
  * removeAttr
  * ~~attrToObj~~
  * css
  * addClass
  * removeClass
  * toggleClass
  * hasClass
  * append
  * appendTo
  * ~~clone (*)~~
  * remove
  * prepend
  * prependTo
  * insertAfter
  * insertAfterTo
  * ~~insertBefore~~
  * ~~insertBeforeTo~~
  * show
  * hide
  * replaceWith
  * hasChilden
  * children
  * empty
  * clear
  * html
  * wrap
  * unwrap
  * wrapAll
  * wrapInner

## Default extends

  * include
  * extends

If you set the variable `Pencil.root` with a path this will be helpful when using `include` and `extends`.

```javascript
Pencil.root = '/root';
```

With Pencil your could include an external navbar.jade like this;

```
include user/navabar@repos/hello
```

The above code will try to include the file `/root/repos/hello/view/user/navbar.jade`.

The same works for `extends`

## Running Tests

Install dev dependencies and make tests:

    $ npm install -d
    $ make test

## Contributors

```
Gabriele Di Stefano <gabriele.ds@gmail.com>
```

![Behere Logo](https://github.com/gabrieleds/behere.github.com/raw/master/assets/behere_logo.png)

## License 

[The MIT License](https://github.com/gabrieleds/pencil/blob/master/LICENSE)