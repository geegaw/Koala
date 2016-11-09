"use strict";

const browserify = require("browserify");
const gulp = require("gulp");
const compiler = require("gulp-hogan-compile");
const jasmine = require("gulp-jasmine");
const jsdoc = require("gulp-jsdoc3");
const jshint = require("gulp-jshint");
const nodemon = require("gulp-nodemon");
const sass = require("gulp-sass");
const source = require("vinyl-source-stream");

const config = require("./config");

const TESTS = "./tests/**/*.js";

const CODE_DIR = "./lib/code";
const LIB_JS = `${CODE_DIR}/**/*.js`;
const LIB_SASS = "./lib/sass/*.scss";
const ALL_SASS = "./lib/sass/**/*.scss";
const ALL_JS = [LIB_JS, TESTS, "./server.js", "./config.js"];

const TEMPLATES = "./lib/templates/**/*.html";

const BROWSER_DIR = `${CODE_DIR}/browser`;
const BROWSER_CODE = `${BROWSER_DIR}/**/*.js`;

const PUBLIC = "./public";
const PUBLIC_JS = `${PUBLIC}/js`;
const PUBLIC_CSS = `${PUBLIC}/css`;

const RELOAD_FILES = ["./server.js", "./config.js", `${PUBLIC}/**/*`];

gulp.task("test:unit", function(){
    gulp.src(TESTS).pipe(jasmine({
        verbose: true,
        includeStackTrace: true,
    }));
});

gulp.task("lint:js", function(){
    return gulp.src(ALL_JS)
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

gulp.task("test", ["lint:js", "test:unit"]);

gulp.task("sass", function () {
    return gulp.src(LIB_SASS)
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest(PUBLIC_CSS));
});

gulp.task("sass:watch", function () {
    gulp.watch(ALL_SASS, ["sass"]);
});

gulp.task("build:koala", function () {
    return browserify(`${BROWSER_DIR}/koala.js`, {
        debug: config.debug,
    })
        .bundle()
        .pipe(source("koala.js"))
        .pipe(gulp.dest(PUBLIC_JS));
});

gulp.task("build:login", function () {
    return browserify(`${BROWSER_DIR}/login.js`)
        .bundle()
        .pipe(source("login.js"))
        .pipe(gulp.dest(PUBLIC_JS));
});

gulp.task("build:js", ["build:koala", "build:login"]);

gulp.task("build:watch", function () {
    gulp.watch(BROWSER_CODE, ["build:js"]);
});

gulp.task("build:templates", function() {
    gulp.src(TEMPLATES)
        .pipe(compiler("templates.js", {
            wrapper: "commonjs",
            hoganModule: "hogan.js"
        }))
        .pipe(gulp.dest("./dist/templates"));
});

gulp.task("start", function() {
    nodemon({
        script: "server.js",
        env: { "NODE_ENV": "development" },
    });
});

gulp.task("doc", function () {
    var docConfig = require("./jsdoc.json");
    gulp.src(["README.md", "./lib/**/*.js"], {read: false})
        .pipe(jsdoc(docConfig));
});

gulp.task("build", ["build:templates", "build:js", "sass"]);

gulp.task("watch", ["sass:watch", "build:watch"]);
gulp.task("default", ["build", "watch", "start"]);