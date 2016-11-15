"use strict";

const Marionette = require("backbone.marionette");

const TextView = require("../../../elements/form/textView");
const EmailView = require("../../../elements/form/emailView");
const PasswordView = require("../../../elements/form/passwordView");

const UserView = Marionette.View.extend({
    template: "pages/users/users-form",
    className: "users--form",

    regions: {
        name: ".users--form--name",
        username: ".users--form--username",
        password: ".users--form--password",
        passwordConfirmation: ".users--form--password-confirmation",
    },

    onRender: function() {
        this.getRegion("name").show(new TextView({
            model: this.model,
            field: "name",
            placeholder: "name for the user",
            label: "Name",
            extraClass: "users--form--name__input",
        }));

        this.getRegion("username").show(new EmailView({
            model: this.model,
            field: "username",
            placeholder: "username - must be email",
            label: "Username",
            extraClass: "users--form--username__input",
        }));

        this.getRegion("password").show(new PasswordView({
            model: this.model,
            field: "password",
            label: "Password",
            extraClass: "users--form--password__input",
        }));

        this.getRegion("passwordConfirmation").show(new PasswordView({
            model: this.model,
            field: "passwordConfirmation",
            label: "Confirm Password",
            extraClass: "users--form--password-confirmation__input",
        }));

    },

});

module.exports = UserView;
