Full. Stack. Testing.
=====================

A full-stack sample JavaScript web application with simple reference tests
for learning frontend, backend and functional testing.

[![Build Status][trav_img]][trav_site]

## Introduction

This repository includes a simple web application that has a client built with:

* **[jQuery](http://jquery.com/)**: Robust client DOM / AJAX library
* **[Webpack](http://webpack.github.io/)**: Organization and bundling tool

and a server built with:

* **[Express](http://expressjs.com/)**: Lightweight server framework

To test our (extremely small) web application, we have three different types
of test setups, discussed [below](#test-types):

```
test/client
test/server
test/func
```

## Test Types

### Client-side Unit Tests

`test/client`

Client-side (aka "frontend") unit tests focus on one or more client application
files in isolation. Some aspects of these tests:

* Extremely fast to execute.
* Run in a test HTML driver page, not the web application HTML.
* Must create mock DOM and data fixtures.
* Mock out real browser network requests / time.
* Typically test some aspect of the UI from the user perspective.


### Server-side Unit / REST Tests

`test/server`

Server-side (aka "backend") tests have two real flavors..

#### Server-side Unit Tests

`test/server/spec`

Pure JavaScript tests that import the server code and test it in isolation.

* Extremely fast to execute.
* Typically test pure code logic in isolation.

#### Server-side REST Tests

`test/server/rest`

REST tests rely on spinning up the backend web application and using an HTTP
client to make real network requests to the server and validate responses.

* Must set up / tear down the application web server.
* Fairly fast to execute (localhost network requests).
* Cover more of an "end-to-end" perspective on validation.


### Functional Tests

`test/func`

Functional (aka "integration", "end-to-end") tests rely on a full, working
instance of the entire web application. These tests typically:

* Are slower than the other test types.
* Take a "black box" approach to the application and interact only via the
  actual web UI.
* Test user behaviors in an end-to-end manner.



[trav]: https://travis-ci.org/
[trav_img]: https://api.travis-ci.org/FormidableLabs/full-stack-testing.svg
[trav_site]: https://travis-ci.org/FormidableLabs/full-stack-testing
