/**
 * Gulpfile
 */
var path = require("path");
var _ = require("lodash");

// Gulp
var gulp = require("gulp");
var sequence = require("gulp-sequence");
var connect = require("gulp-connect");
var eslint = require("gulp-eslint");
var gutil = require("gulp-util");
var jsxcs = require("gulp-jsxcs");
var nodemon = require("gulp-nodemon");
var rimraf = require("gulp-rimraf");
var karma = require("karma").server;
var mocha = require("gulp-mocha");
var istanbul = require("gulp-istanbul");

// Build imports
var webpack = require("webpack");
var prodBuild = require("./webpack.config");
var devBuild = require("./webpack.config.dev");
var testBuild = require("./webpack.config.test");
var covBuild = require("./webpack.config.coverage");

// Log colors
var cyan = gutil.colors.cyan;

// ----------------------------------------------------------------------------
// Constants
// ----------------------------------------------------------------------------
var FRONTEND_JS_APP_FILES = [
  "client/**/*.js",
  "app/doc/public/*.js",
  "test/client/main.js"
];

var FRONTEND_JS_TEST_FILES = [
  "test/client/**/*.spec.js"
];

var BACKEND_JS_INFRA_FILES = [
  "app/heroku/**/*.js",
  "test/server/setup.js",
  "test/func/setup.js",
  "*.js"
];

var BACKEND_JS_APP_FILES = [
  "server/**/*.js"
];

var BACKEND_JS_TEST_FILES = [
  "test/server/**/*.spec.js"
];

var FUNC_JS_TEST_FILES = [
  "test/func/**/*.spec.js"
];

// ----------------------------------------------------------------------------
// EsLint
// ----------------------------------------------------------------------------
var _eslint = function (files, cfg) {
  return function () {
    return gulp
      .src(files)
      .pipe(eslint(cfg))
      .pipe(eslint.formatEach("stylish", process.stderr))
      .pipe(eslint.failOnError());
  };
};

gulp.task("eslint:frontend", _eslint(FRONTEND_JS_APP_FILES, {
  envs: ["browser"]
}));

gulp.task("eslint:frontend:test", _eslint(FRONTEND_JS_TEST_FILES, {
  envs: ["browser", "mocha"],
  globals: ["expect", "sinon"]
}));

gulp.task("eslint:backend", _eslint(
  [].concat(BACKEND_JS_INFRA_FILES, BACKEND_JS_APP_FILES), {
  envs: ["node"]
}));

gulp.task("eslint:backend:test", _eslint(BACKEND_JS_TEST_FILES, {
  envs: ["node", "mocha"],
  globals: ["expect"]
}));

gulp.task("eslint:func:test", _eslint(FUNC_JS_TEST_FILES, {
  envs: ["node", "mocha"],
  globals: ["expect"]
}));

gulp.task("eslint", [
  "eslint:frontend", "eslint:frontend:test",
  "eslint:backend", "eslint:backend:test",
  "eslint:func:test"
]);

// ----------------------------------------------------------------------------
// JsCs
// ----------------------------------------------------------------------------
gulp.task("jscs", function () {
  return gulp
    .src([].concat(
      FRONTEND_JS_APP_FILES,
      FRONTEND_JS_TEST_FILES,
      BACKEND_JS_INFRA_FILES,
      BACKEND_JS_APP_FILES,
      BACKEND_JS_TEST_FILES
    ))
    .pipe(jsxcs());
});

// ----------------------------------------------------------------------------
// Tests: Client
// ----------------------------------------------------------------------------
// Use `node_modules` Phantom
process.env.PHANTOMJS_BIN = require("phantomjs").path;

// Karma coverage.
var KARMA_COV = {
  reporters: ["spec", "coverage"],
  files: [
    "node_modules/sinon/pkg/sinon.js",
    "app/js-test/bundle-coverage.js"
  ],
  coverageReporter: {
    reporters: [
      { type: "json", file: "coverage.json" },
      { type: "lcov" },
      { type: "text-summary" }
    ],
    dir: "coverage/client"
  }
};

// Task helper.
var _karma = function () {
  var cfg = _.extend.apply(_, [{
    configFile: path.join(__dirname, "test/client/karma.conf.js")
  }].concat(_.toArray(arguments)));

  return function (done) {
    karma.start(cfg, done);
  };
};

// Instances.
// Fast: Phantom-only, w/ coverage
var _karmaFast = _karma(KARMA_COV);
// All: No coverage, all Mac browsers
var _karmaAll = _karma(KARMA_COV, {
  browsers: ["PhantomJS", "Chrome", "Firefox", "Safari"]
});

gulp.task("karma:fast", _karmaFast);
gulp.task("karma:ci:linux", _karma(KARMA_COV, {
  browsers: ["PhantomJS", "Firefox"]
}));
gulp.task("karma:ci:win", _karma(KARMA_COV, {
  browsers: ["PhantomJS", "IE"]
}));
gulp.task("karma:win-all", _karma(KARMA_COV, {
  browsers: ["PhantomJS", "Chrome", "Firefox", "IE"]
}));
gulp.task("karma:all", _karmaAll);

gulp.task("test:frontend", ["clean:coverage:client"], _karmaFast);
gulp.task("test:frontend:ci:linux", ["karma:ci:linux"]);
gulp.task("test:frontend:ci:win", ["karma:ci:win"]);
gulp.task("test:frontend:all", ["clean:coverage:client"], _karmaAll);

// ----------------------------------------------------------------------------
// Tests: Server, Functional
// ----------------------------------------------------------------------------
var _mocha = function (type, testFiles) {
  return function (done) {
    // First, cover files.
    gulp
      .src(BACKEND_JS_APP_FILES)
      .pipe(istanbul({
        includeUntested: true
      }))
      .pipe(istanbul.hookRequire())
      .on("finish", function () {
        // Second, run the tests
        require("./test/" + type + "/setup");

        gulp
          .src(testFiles, { read: false })
          .pipe(mocha())
          .pipe(istanbul.writeReports({
            dir: "./coverage/" + type,
            reportOpts: { dir: "./coverage/" + type },
            reporters: ["lcov", "json", "text-summary"] // "text",
          }))
          .on("end", done);
      });
  };
};

gulp.task("test:backend", ["clean:coverage:server"], _mocha("server", BACKEND_JS_TEST_FILES));
gulp.task("test:func", ["clean:coverage:func"], _mocha("func", FUNC_JS_TEST_FILES));

// ----------------------------------------------------------------------------
// Tests: Aggregations
// ----------------------------------------------------------------------------
gulp.task("test", ["test:backend", "test:func", "test:frontend"]);
gulp.task("test:ci:linux", ["test:backend", "test:func", "test:frontend:ci:linux"]);
// TODO: Add back `"test:func",` after fix for
// https://github.com/FormidableLabs/full-stack-testing/issues/33
gulp.task("test:ci:win", ["test:backend", "test:frontend:ci:win"]);
gulp.task("test:all", ["test:backend", "test:func", "test:frontend:all"]);

// ----------------------------------------------------------------------------
// Quality
// ----------------------------------------------------------------------------
// Dev
gulp.task("check:base", ["jscs", "eslint"]);
gulp.task("check", ["check:base", "test"]);
gulp.task("check:all", ["check:base", "test:all"]);

// CI
gulp.task("check:ci:linux", ["check:base", "test:ci:linux"]);
gulp.task("check:ci:win", ["check:base", "test:ci:win"]);

// ----------------------------------------------------------------------------
// Builders
// ----------------------------------------------------------------------------
var _webpackUpdate = function (err, stats) {
  if (err) { throw new gutil.PluginError("webpack", err); }

  gutil.log(cyan("[webpack]"), stats.toString({
    hash: true,
    colors: true,
    cached: false
  }));
};

// Create webpack task.
var _webpack = function (cfg) {
  // Single compiler for caching.
  var compiler = webpack(cfg);

  return {
    run: function (done) {
      done = done || function () {};
      compiler.run(function (err, stats) {
        _webpackUpdate(err, stats);
        done();
      });
    },
    watch: function () {
      compiler.watch(100, _webpackUpdate);
    }
  };
};

// -----------
// Cleaning
// -----------
gulp.task("clean:dist", function () {
  return gulp
    .src([
      "app/js-dist",
      "app/js-map",
      "app/js-test",
      "app/build"
      ], { read: false })
    .pipe(rimraf());
});

gulp.task("clean:coverage:client", function () {
  return gulp
    .src(["coverage/client"], { read: false })
    .pipe(rimraf());
});

gulp.task("clean:coverage:server", function () {
  return gulp
    .src(["coverage/server"], { read: false })
    .pipe(rimraf());
});

gulp.task("clean:coverage:func", function () {
  return gulp
    .src(["coverage/func"], { read: false })
    .pipe(rimraf());
});

gulp.task("clean", [
  "clean:dist",
  "clean:coverage:client",
  "clean:coverage:server",
  "clean:coverage:func"
]);

// -----------
// Production
// -----------
var _webpackProd = _webpack(prodBuild);
gulp.task("build:prod", _webpackProd.run);
gulp.task("watch:prod", _webpackProd.watch);

// -----------
// Development
// -----------
var _webpackDev = _webpack(devBuild);
gulp.task("build:dev", _webpackDev.run);
gulp.task("watch:dev", _webpackDev.watch);
gulp.task("watch", ["watch:dev"]);

// -----------
// Test
// -----------
var _webpackTest = _webpack(testBuild);
gulp.task("build:frontend:test", _webpackTest.run);
gulp.task("watch:frontend:test", _webpackTest.watch);

var _webpackCov = _webpack(covBuild);
gulp.task("build:frontend:coverage", _webpackCov.run);
gulp.task("watch:frontend:coverage", _webpackCov.watch);

gulp.task("build:test", ["build:frontend:test", "build:frontend:coverage"]);

// ----------------------------------------------------------------------------
// Servers
// ----------------------------------------------------------------------------
// Dev. servers
// Exec'ed
gulp.task("server:dev", function () {
  var app = require("./server/index");
  var port = process.env.PORT || "3000";
  app.serveRoot();
  app.listen(port, function () {
    gutil.log(cyan("[server]"),
      "Start dev server at: http://127.0.0.1:" + port);
  });
});

// Auto-restart
// BUG: Doesn't work on windows.
// https://github.com/FormidableLabs/full-stack-testing/issues/28
gulp.task("server:nodemon", function () {
  nodemon({
    script: "server/index.js",
    ext: "js,json",
    env: {
      NODE_ENV: "development"
    },
    watch: [
      "server",
      "app/build"
    ]
  });
});

// Source maps server
gulp.task("server:sources", function () {
  connect.server({
    root: __dirname,
    port: 3001
  });
});

// ----------------------------------------------------------------------------
// Aggregations
// ----------------------------------------------------------------------------
gulp.task("dev", sequence(
  "clean",
  ["watch:dev", "watch:frontend:test", "watch:frontend:coverage"],
  ["server:dev", "server:sources"]
));
gulp.task("watch", sequence(
  "clean",
  ["watch:dev", "watch:frontend:test", "watch:frontend:coverage"],
  ["server:nodemon", "server:sources"]
));
gulp.task("prod", sequence(["watch:prod", "server", "server:sources"]));
gulp.task("build", sequence("clean:dist", "build:prod"));
gulp.task("build:all", sequence("clean:dist", ["build:dev", "build:test"]));
gulp.task("default", sequence("clean", ["build:dev", "build:test"], "check"));
