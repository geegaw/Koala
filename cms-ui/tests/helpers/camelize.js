"use strict";

const camelize = require("../../lib/code/browser/helpers/camelize");

describe("camelize", function() {

    const tests = {
        "simple case": {
            testcase: "simple case",
            expects: "simpleCase",
        },
        "multiple words": {
            testcase: "simple case expanded",
            expects: "simpleCaseExpanded",
        },
        "starts with space": {
            testcase: " simple case",
            expects: "simpleCase",
        },
        "starts with number": {
            testcase: ". simple case",
            expects: "simpleCase",
        },
        "special chars": {
            testcase: "very wordy, non-standard name?",
            expects: "veryWordyNonStandardName",
        },
    };

    Object.keys(tests).forEach(function(testname) {
        let test = tests[testname];
        it(testname, function() {
            expect(camelize(test.testcase)).toBe(test.expects);
        });
    });

});
