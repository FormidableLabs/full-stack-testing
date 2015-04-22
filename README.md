Full. Stack. Testing.
---------------------

Learn frontend, backend, and functional testing with a full-stack JavaScript
web application, sample tests, exercises, and more!

[![Travis Status][trav_img]][trav_site]
[![Appveyor Status][av_img]][av_site]
[![Coverage Status][cov_img]][cov_site]

## Introduction

We start with a simple "Converter" [web application][fst_app] that converts
strings to [camel][], [snake][], or dashed cases. You can see an online
demo of the app/tests (with local development counterparts) at:
[full-stack-testing.formidablelabs.com][fst_site]

* **[Converter Web App][fst_app]** ([127.0.0.1:3000][dev_app])
* **[Client Unit Tests][fst_test]**
  ([127.0.0.1:3001/test/client/test.html][dev_test])

### Stack

The frontend app uses [jQuery][] for DOM/AJAX work and is built with the
wonderful [Webpack][] bundling tool. The backend server uses the ever popular
[Express][] framework for our REST API.

To test our application, we write **backend**, **frontend**, and **functional**
tests with technologies that include:

* **[Mocha](http://mochajs.org/)**: Suites, tests
* **[Chai](http://chaijs.com/)**: Assertions
* **[Sinon.JS](http://sinonjs.org/)**: Fakes
* **[SuperTest](https://github.com/visionmedia/supertest)**: REST requests,
  asserts

## Getting Started

See our [installation instructions](./INSTALL.md). Here's a `tl;dr` summary:

```sh
$ git clone https://github.com/FormidableLabs/full-stack-testing.git
$ cd full-stack-testing
$ npm install
$ npm run-script check
```

## Tests

The test suites in this project can be found in the following locations:

```
test/server
test/client
test/func
```

For each of these

### Backend Tests

`test/server`

Server-side (aka "backend") tests have two real flavors -- *unit* and *REST*
tests. To run all the server-side tests, try:

```sh
# Mac/Linux
$ node_modules/.bin/mocha --opts test/server/mocha.opts test/server

# Windows
$ node_modules\.bin\mocha --opts test\server\mocha.opts test\server
```

#### Server-side Unit Tests

`test/server/spec`

Pure JavaScript tests that import the server code and test it in isolation.

* Extremely fast to execute.
* Typically test pure code logic in isolation.

Run the tests with:

```sh
# Mac/Linux
$ node_modules/.bin/mocha --opts test/server/mocha.opts test/server/spec

# Windows
$ node_modules\.bin\mocha --opts test\server\mocha.opts test\server\spec
```

#### Server-side REST Tests

`test/server/rest`

REST tests rely on spinning up the backend web application and using an HTTP
client to make real network requests to the server and validate responses.

* Must set up / tear down the application web server.
* Issue real REST requests against server and verify responses.
* Fairly fast to execute (localhost network requests).
* Cover more of an "end-to-end" perspective on validation.

Run the tests with:

```sh
# Mac/Linux
$ node_modules/.bin/mocha --opts test/server/mocha.opts test/server/rest

# Windows
$ node_modules\.bin\mocha --opts test\server\mocha.opts test\server\rest
```

### Frontend Tests

`test/client/spec`

Client-side (aka "frontend") unit tests focus on one or more client application
files in isolation. Some aspects of these tests:

* Extremely fast to execute.
* Execute via a test HTML driver page, not the web application HTML.
* Must create mock DOM and data fixtures.
* Mock out real browser network requests / time.
* Typically test some aspect of the UI from the user perspective.
* Run tests in the [browser][fst_test] or from command line.

Build, then run the tests from the command line with:

```sh
# Mac/Linux
$ node_modules/.bin/webpack --config webpack.config.test.js
$ node node_modules/karma/bin/karma start test/client/karma.conf.js

# Windows
$ node_modules\.bin\webpack --config webpack.config.test.js
$ node node_modules\karma\bin\karma start test\client\karma.conf.js
```

### Functional Tests

`test/func`

Functional (aka "integration", "end-to-end") tests rely on a full, working
instance of the entire web application. These tests typically:

* Are slower than the other test types.
* Take a "black box" approach to the application and interact only via the
  actual web UI.
* Test user behaviors in an end-to-end manner.

Run the tests with:

```sh
# Mac/Linux
$ node_modules/.bin/mocha --opts test/func/mocha.opts test/func/spec

# Windows
$ node_modules\.bin\mocha --opts test\func\mocha.opts test\func\spec
```

## Sample Web App

The "Converter" is a simple utility to camel/dash/snake case a string by way
of a single-page-application issuing XHR commands to a REST command backed
by a server that does the conversions.

We actually use **two** servers for our project:

* [127.0.0.1:3000](http://127.0.0.1:3000/): The **dev server**, which serves
  the sample converter application
* [127.0.0.1:3001](http://127.0.0.1:3001/): The **sources server**, which is
  a simple static file server that serves **source maps** for the main
  application and the **test HTML page**.
* [127.0.0.1:3001/test/client/test.html](http://127.0.0.1:3001/test/client/test.html):
  Frontend (client) unit tests.

### Standalone Dev Server

If you're already _done_ with the frontend build, then you can manually run
just the dev server with:

```sh
# Mac/Linux
$ node server/index.js

# Windows
$ node server\index.js
```

**Note**: This does not run the source maps server nor does it rebuild / restart
servers on frontend / backend code changes.

### Single Build + Dev/Sources Servers

To do a single build and run the dev/sources servers, do:

```sh
$ npm start
```

**Note**: You will have to restart the server on backend code changes manually
and rebuild your frontend JS on changes.

### Watched Rebuilds + Dev/Sources Servers

To watch _both_ frontend and backend files for changes and rebuild / restart
via nodemon use:

```sh
$ npm run-script watch
```

**Note**: The `gulp watch` / `npm run-script watch` commands are currently
broken on Windows with Node `v0.12` for both:

* Webpack: [#35](https://github.com/FormidableLabs/full-stack-testing/issues/35)
* Nodemon: [#28](https://github.com/FormidableLabs/full-stack-testing/issues/28)

due to some file-watching issues.

[jQuery]: http://jquery.com/
[Webpack]: http://webpack.github.io/
[Express]: http://expressjs.com/
[camel]: http://en.wikipedia.org/wiki/CamelCase
[snake]: http://en.wikipedia.org/wiki/Snake_case

[fst_site]: http://full-stack-testing.formidablelabs.com/
[fst_test]: http://full-stack-testing.formidablelabs.com/test/client/test.html
[fst_app]: http://full-stack-testing.formidablelabs.com/app/
[dev_app]: http://127.0.0.1:3000/
[dev_test]: http://127.0.0.1:3001/test/client/test.html

[trav]: https://travis-ci.org/
[trav_img]: https://api.travis-ci.org/FormidableLabs/full-stack-testing.svg
[trav_site]: https://travis-ci.org/FormidableLabs/full-stack-testing
[av]: https://ci.appveyor.com/
[av_img]: https://ci.appveyor.com/api/projects/status/7fdajvg832480dnb?svg=true
[av_site]: https://ci.appveyor.com/project/ryan-roemer/full-stack-testing
[cov]: https://coveralls.io
[cov_img]: https://img.shields.io/coveralls/FormidableLabs/full-stack-testing.svg
[cov_site]: https://coveralls.io/r/FormidableLabs/full-stack-testing
