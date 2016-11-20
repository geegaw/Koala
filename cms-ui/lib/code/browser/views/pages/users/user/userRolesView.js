"use strict";

const Marionette = require("backbone.marionette");

const Roles = require("../../../../collections/Roles");

const UserRolesView = Marionette.View.extend({
    template: "pages/users/user-roles",
    className: "users--roles",

    roles: new Roles(),

    ui: {
        role: ".user__role__input",
    },

    initialize: function() {
        this.roles.fetch().then(this.render.bind(this));
    },

    templateContext: function() {
        return {
            roles: this.formatRoles(),
        };
    },

    events: {
        "change @ui.role": "setValue",
    },

    formatRoles: function() {
        let userRoles = this.model.get("roles") || [];
        let formattedRoles = [];
        let cid = this.cid;
        this.roles.forEach(function(role) {
            formattedRoles.push({
                cid: cid + "_" + role.id,
                value: role.id,
                label: role.get("name"),
                checked: Boolean(userRoles.indexOf(role.id) >= 0),
            });
        });
        return formattedRoles;
    },

    setValue: function(evt) {
        let value = evt.currentTarget.value;
        if (evt.currentTarget.checked) {
            this.model.get("roles").push(value);
        } else {
            let pos = this.model.get("roles").indexOf(value);
            this.model.get("roles").splice(pos, 1);
        }
    },

});

module.exports = UserRolesView;
