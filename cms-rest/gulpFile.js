"use strict";

const gulp = require("gulp");
const jasmine = require("gulp-jasmine");
const jsdoc = require("gulp-jsdoc3");
const jshint = require("gulp-jshint");
const nodemon = require("gulp-nodemon");
const prettify = require("gulp-jsbeautifier");

const TESTS = "./tests/integrations/**/*.js";
const LIB_JS = "./lib/**/*.js"
const ALL_JS = [LIB_JS, TESTS, "./server.js", "./config.js"];


gulp.task("test:unit", function(){
    gulp.src(TESTS).pipe(jasmine({
        verbose: true,
        includeStackTrace: true,
    }));
});

gulp.task("beautify:js", function() {
    return gulp.src(ALL_JS, {
        base: "./"
    })
        .pipe(prettify({
            config: __dirname + "/tests/configs/jsbeautifyrc.json",
        }))
        .pipe(gulp.dest("."));
});

gulp.task("lint:js", function(){
    return gulp.src(ALL_JS)
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

gulp.task("test", ["beautify:js", "lint:js", "test:unit"]);

gulp.task("doc", function () {
    var config = require("./tests/configs/jsdoc.json");
    gulp.src(["README.md", "./lib/models/**/*.js"], {read: false})
        .pipe(jsdoc(config));
});

gulp.task("start", function() {
    nodemon({
        script: "server.js",
        env: { "NODE_ENV": "development" },
    });
});

gulp.task("default", ["start"]);
