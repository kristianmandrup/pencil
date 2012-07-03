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

...

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

app.get('/', function(req, res, next){
  res.end('Ciao Pencil');
});

app.listen(3000);
```

## Features

  * ...

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