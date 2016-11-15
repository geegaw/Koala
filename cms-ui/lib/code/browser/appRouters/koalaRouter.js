"use strict";

const Marionette = require("backbone.marionette");

const RolesView = require("../views/pages/roles/roles/rolesView");
const RolesFormView = require("../views/pages/roles/role/rolesFormView");
const Roles = require("../collections/Roles");
const Role = require("../models/Role");

const HomeView = require("../views/pages/homeView");
const PageNotFoundView = require("../views/pages/pageNotFoundView");
const unAuthorizedView = require("../views/pages/unAuthorizedView");

const KoalaRouter = Marionette.AppRouter.extend({

    routes: {

        "roles/new": "newRole",
        "roles/:id": "editRole",
        "roles": "roles",

        "home": "home",
        "*notfound": "pageNotFound",
    },

    roles: function() {
        if (this.authorized("read_roles")) {
            this.triggerMethod("load:view", new RolesView({
                collection: new Roles(),
            }));
        }
    },

    editRole: function(id) {
        if (this.authorized("update_roles")) {
            this.role(new Role({
                id: id
            }));
        }
    },

    newRole: function() {
        if (this.authorized("create_roles")) {
            this.role(new Role());
        }
    },

    role: function(model) {
        this.triggerMethod("load:view", new RolesFormView({
            model: model,
            label: "Role",
            returnTo: "/roles",
        }));
    },

    home: function() {
        this.triggerMethod("load:view", new HomeView());
    },

    pageNotFound: function() {
        this.triggerMethod("load:view", new PageNotFoundView());
    },

    authorized: function(permission) {
        if (!userCan(permission)) {
            this.unAuthorized();
            return false;
        }
        return true;
    },

    unAuthorized: function() {
        this.triggerMethod("load:view", new unAuthorizedView());
    },

    onRoute: function(name, path, args) {
        console.log(name, path, args);
    },

});

module.exports = KoalaRouter;
