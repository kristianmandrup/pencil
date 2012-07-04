> ![Stage](https://github.com/behere/behere.github.com/raw/master/assets/stage/testing.png)  
[![Build Status](https://secure.travis-ci.org/behere/pencil.png)](http://travis-ci.org/behere/pencil)

> version 0.1.1 (unstable) - [History](https://github.com/behere/pencil/blob/master/HISTORY.md)

# Pencil
  
Are you working with [Jade](https://github.com/visionmedia/jade)? Want to make __custom tags__? ...this is the place to be :-)

  * let's you create custom tags
  * extends the Tag object (jQuery like methods)
  * extends *include* and *extends*

This project is not intended to replace Jade, but instead to extend it.

## Installation

Install this using `npm` as follows

    $ npm install pencil

## Quick Start

### Use standalone

```javascript
var http = require('http')
  , pencil = require('pencil')
  , fs = require('fs')
  ;

http.createServer(function (req, res) {
  
  var path = __dirname + '/text.jade'
    , str = fs.readFileSync(path, 'utf8')
    , fn = pencil.compile(str, { filename: path, pretty: true })
    ; 
  
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(fn({ var1: 'data1', var2: 'data2' }));
  
}).listen(3000, '127.0.0.1');
```

### Use with Express

Pencil attaches itself to your [Express](http://expressjs.com/) server (including Jade).
By default:
  - *.jade files are associated to Pencil compiler
  - views are located in the ./view folder of your project

```javascript
var pencil = require('pencil')
  , express = require('express')
  ;

var app = express.createServer();

pencil.attach({
  express: express,
  server: app
});

app.configure(function(){
  app.set('views', __dirname + '/view');
});

app.get('/', function(req, res, next){
  res.render('text.jade', {});
});

app.listen(3000);
```

## Default hacked tags

Pencil comes with a few tags that have a default behavior: `html, favicon, style, script, form and input`

They could include attributes or child nodes:

```
html
=> <html lang='en'></html>

favicon(href='/favicon.ico')
=> <link href='/favicon.ico' type='image/x-icon' rel='shortcut icon' />

form(action='/readme')
=> <form type='post' action='/readme'>
=>   <input type='hidden' name='_method' value='post' />
=> </form>

input
=> <input type="text" />

script(src='/script_path')
=> <script type="text/javascript" scr="/script_path"></script>

style(href='/style_path')
=> <link type='text/css' rel='stylesheet' href='/style_path' />

style
=> <style type='text/css'></style>
```

## Custom tags

The main purpose of Pencil is to be able to build custom tags usable within Jade syntax.

## Extended tag object

  * ...

## Default extends

  * include
  * extends
  * 
  * pencil.ns
  * id
  * cls
  * tag
  * block

## Running Tests

Install dev dependencies and make tests:

    $ npm install -d
    $ make test

## Contributors

```
Gabriele Di Stefano <gabriele.ds@gmail.com>
```

![Behere Logo](https://github.com/behere/behere.github.com/raw/master/assets/behere_logo.png)

## License 

[The MIT License](https://github.com/behere/pencil/blob/master/LICENSE)