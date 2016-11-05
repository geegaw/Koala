"use strict";

const gulp = require("gulp");
const jasmine = require("gulp-jasmine");

const TESTS = "./tests/integrations/**/*.js";

gulp.task("test:unit", function(){
    gulp.src(TESTS).pipe(jasmine({
        verbose: true,
        includeStackTrace: true,
    }));
});

gulp.task("test", ["test:unit"]);
