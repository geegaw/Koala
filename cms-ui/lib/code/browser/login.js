"use strict";

const $ = require("jquery");
const crypto = require("crypto");

const config = require("../../../config");

let redirectedFrom = null;

$("form").submit(function() {
    $(".invalid").hide();
    if (validateForm()){
        let data = {
            username: $(".username").val().trim(),
            password: hashify($(".password").val().trim()),
        };

        $.post("/login", data, "json").done(function(){
           window.location = redirectedFrom || "/home";
        }).fail(function(){
            $(".invalid").show();
        });
    }
    return false;
});

function validateForm() {
    return $(".username").val().trim().length > 0 && $(".password").val().trim().length > 0;
}

function hashify(password) {
    const hash = crypto.createHash(config.hash.algo);
    return hash.update(password + config.hash.salt).digest(config.hash.digest);
}
