"use strict";

const Marionette = require("backbone.marionette");

const PermissionsView = require("./permissionsView");
const TextView = require("../../../elements/form/textView");
const TextareaView = require("../../../elements/form/textareaView");

const RoleView = Marionette.View.extend({
    template: "pages/roles/roles-form",
    className: "roles--form",

    regions: {
        name: ".roles--form--name",
        description: ".roles--form--description",
        permissions: ".roles--form--permissions",
    },

    onRender: function() {
        this.getRegion("name").show(new TextView({
            model: this.model,
            field: "name",
            placeholder: "name for the role",
            label: "Name",
            extraClass: "roles--form--name__input",
        }));

        this.getRegion("description").show(new TextareaView({
            model: this.model,
            field: "description",
            placeholder: "short description for the role",
            label: "Description",
            extraClass: "roles--form--name__input",
        }));

        this.getRegion("permissions").show(new PermissionsView({
            collection: this.model.get("permissions"),
        }));

    },

});

module.exports = RoleView;
