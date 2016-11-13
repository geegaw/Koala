"use strict";

const Marionette = require("backbone.marionette");

const CommandsView = require("../../elements/form/commandsView");
const PermissionsView = require("./permissionsView");
const TextView = require("../../elements/form/textView");
const TextareaView = require("../../elements/form/textareaView");


const RolesFormView = Marionette.View.extend({
    template: "pages/roles/roles-form",
    className: "koala-container roles--form",

    templateContext: function() {
        return {
            action: this.id ? "Edit" : "Create",
        };
    },

    regions: {
        name: ".roles--form--name",
        description: ".roles--form--description",
        permissions: ".roles--form--permissions",
        commands: ".roles--commands"
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

        this.getRegion("commands").show(new CommandsView({
            model: this.model,
        }));
    },

});

module.exports = RolesFormView;
