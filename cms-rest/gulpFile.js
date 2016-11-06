"use strict";

const gulp = require("gulp");
const jasmine = require("gulp-jasmine");
const jsdoc = require("gulp-jsdoc3");

const TESTS = "./tests/integrations/**/*.js";

gulp.task("test:unit", function(){
    gulp.src(TESTS).pipe(jasmine({
        verbose: true,
        includeStackTrace: true,
    }));
});

gulp.task("test", ["test:unit"]);

gulp.task("doc", function () {
    var config = require("./jsdoc.json");
    gulp.src(["README.md", "./lib/models/**/*.js"], {read: false})
        .pipe(jsdoc(config));
});
