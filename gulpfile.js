/**
 * Gulpfile
 */
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
var karma = require("gulp-karma");
var mocha = require("gulp-mocha");
var istanbul = require("gulp-istanbul");

// Build imports
var webpack = require("webpack");
var prodBuild = require("./webpack.config");
var devBuild = require("./webpack.config.dev");
var testBuild = require("./webpack.config.test");

// Log colors
var cyan = gutil.colors.cyan;

// ----------------------------------------------------------------------------
// Constants
// ----------------------------------------------------------------------------
var FRONTEND_JS_APP_FILES = [
  "client/**/*.js",
  "test/client/setup.js"
];

var FRONTEND_JS_TEST_FILES = [
  "test/client/**/*.spec.js"
];

var BACKEND_JS_APP_FILES = [
  "server/**/*.js",
  // Include test setup, task runner files too.
  "test/server/setup.js",
  "test/func/setup.js",
  "*.js"
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
// TODO[RYAN]: Consider `sandbox`?
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
  globals: ["expect", "sandbox"],
  rules: { "max-nested-callbacks": [2, 6] }
}));

gulp.task("eslint:backend", _eslint(BACKEND_JS_APP_FILES, {
  envs: ["node"]
}));

gulp.task("eslint:backend:test", _eslint(BACKEND_JS_TEST_FILES, {
  envs: ["node", "mocha"],
  globals: ["expect", "sandbox"],
  rules: { "max-nested-callbacks": [2, 6] }
}));

gulp.task("eslint:func:test", _eslint(FUNC_JS_TEST_FILES, {
  envs: ["node", "mocha"],
  globals: ["expect"],
  rules: { "max-nested-callbacks": [2, 6] }
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
      BACKEND_JS_APP_FILES,
      BACKEND_JS_TEST_FILES
    ))
    .pipe(jsxcs());
});

// ----------------------------------------------------------------------------
// Tests: Client
// ----------------------------------------------------------------------------
// Use `node_modules` Phantom
process.env.PHANTOMJS_BIN = "./node_modules/.bin/phantomjs";

// TODO[RYAN]: Hook up Sauce Labs for everything in browser matrix.
//
// SauceLabs tag.
// var SAUCE_BRANCH = process.env.TRAVIS_BRANCH || "local";
// var SAUCE_TAG = process.env.SAUCE_USERNAME + "@" + SAUCE_BRANCH;

// Karma base options
var KARMA_BASE = {
  frameworks: ["mocha"],
  reporters: ["mocha"],
  files: [
    // Test libraries.
    "node_modules/sinon/pkg/sinon.js",

    // Rest is bundled.
    "app/js-test/bundle.js"
  ],
  port: 9999,
  client: {
    mocha: {
      ui: "bdd"
    }
  }
};

// Karma coverage.
var KARMA_COV = {
  reporters: ["mocha", "coverage"],
  preprocessors: {
    // TODO[RYAN]: Switch to per-app-file coverage instead of the whole bundle.
    "app/js-test/bundle.js": ["coverage"]
  },
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
  var cfg = _.extend.apply(_, [{}].concat(_.toArray(arguments)));

  return function () {
    gulp
      .src(cfg.files)
      .pipe(karma(cfg))
      .on("error", function (err) {
        throw new gutil.PluginError("karma", err);
      });
  };
};

// Instances.
// Fast: Phantom-only, w/ coverage
var _karmaFast = _karma(KARMA_BASE, KARMA_COV, {
  browsers: ["PhantomJS"]
});
// All: No coverage, all Mac browsers
var _karmaAll = _karma(KARMA_BASE, {
  browsers: ["PhantomJS", "Chrome", "Firefox", "Safari"]
});

gulp.task("karma:fast", _karmaFast);

gulp.task("karma:ci", _karma(KARMA_BASE, {
  browsers: ["PhantomJS", "Firefox"]
}));

gulp.task("karma:all", _karmaAll);

gulp.task("test:frontend", ["clean:coverage:client"], _karmaFast);
gulp.task("test:frontend:ci", ["karma:ci"]);
gulp.task("test:frontend:all", ["clean:coverage:client"], _karmaAll);

// ----------------------------------------------------------------------------
// Tests: Server, Functional
// ----------------------------------------------------------------------------
gulp.task("test:backend", ["clean:coverage:server"], function (done) {
  // Global setup.
  require("./test/server/setup");

  // First, cover files.
  gulp
    .src(BACKEND_JS_APP_FILES)
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
    .on("finish", function () {
      // Second, run the tests
      gulp
        .src(BACKEND_JS_TEST_FILES, { read: false })
        .pipe(mocha({
          reporter: "spec"
        }))
        .pipe(istanbul.writeReports({
          dir: "./coverage/server",
          reportOpts: { dir: "./coverage/server" },
          reporters: ["lcov", "json", "text-summary"] // "text",
        }))
        .on("end", done);
    });
});

// TODO[RYAN]: Func tests.

gulp.task("test", ["test:backend", "test:frontend"]);
gulp.task("test:ci", ["test:backend", "test:frontend:ci"]);
gulp.task("test:all", ["test:backend", "test:frontend:all"]);

// ----------------------------------------------------------------------------
// Quality
// ----------------------------------------------------------------------------
gulp.task("check:base", ["jscs", "eslint"]);
gulp.task("check", ["check:base"]); // TODO[RYAN], "test"]);
gulp.task("check:ci", ["check:base", "test:ci"]);
gulp.task("check:all", ["check:base", "test:all"]);

// ----------------------------------------------------------------------------
// Builders
// ----------------------------------------------------------------------------
// Create webpack task.
var _webpack = function (cfg) {
  // Single compiler for caching.
  var compiler = webpack(cfg);

  return function (done) {
    compiler.run(function (err, stats) {
      if (err) { throw new gutil.PluginError("webpack", err); }

      gutil.log(cyan("[webpack]"), stats.toString({
        hash: true,
        colors: true,
        cached: false
      }));

      done();
    });
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

gulp.task("clean", [
  "clean:dist",
  "clean:coverage:client",
  "clean:coverage:server"
]);

// -----------
// Production
// -----------
gulp.task("build:prod", _webpack(prodBuild));
gulp.task("watch:prod", function () {
  gulp.watch(FRONTEND_JS_APP_FILES, ["build:prod"]);
});

// -----------
// Development
// -----------
gulp.task("build:dev", _webpack(devBuild));
gulp.task("watch:dev", function () {
  gulp.watch(FRONTEND_JS_APP_FILES, ["build:dev"]);
});
gulp.task("watch", ["watch:dev"]);

// -----------
// Test
// -----------
gulp.task("build:frontend:test", _webpack(testBuild));

gulp.task("watch:frontend:test", function () {
  gulp.watch([].concat(
    FRONTEND_JS_APP_FILES,
    FRONTEND_JS_TEST_FILES
  ), ["build:frontend:test"]);
});

gulp.task("build:test", ["build:frontend:test"]);

// ----------------------------------------------------------------------------
// Servers
// ----------------------------------------------------------------------------
// Dev. server
gulp.task("server", function () {
  nodemon({
    script: "server/index.js",
    ext: "js,json",
    env: {
      NODE_ENV: "development"
    },
    watch: [
      "server",
      "client",
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
  ["build:dev", "build:frontend:test"],
  ["watch:dev", "watch:frontend:test",
   "server", "server:sources"]
));
gulp.task("prod", sequence("build:prod", ["watch:prod", "server", "server:sources"]));
gulp.task("build", sequence("clean:dist", "build:prod"));
gulp.task("default", sequence("clean", ["build:dev", "build:test"], "check"));
