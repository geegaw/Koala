"use strict";

const Marionette = require("backbone.marionette");

const RolesView = require("../views/pages/roles/rolesView");
const RolesFormView = require("../views/pages/roles/rolesFormView");
const Role = require("../models/Role");

const HomeView = require("../views/pages/homeView");
const PageNotFoundView = require("../views/pages/pageNotFoundView");


const KoalaRouter = Marionette.AppRouter.extend({


    routes: {

        "roles/new": "newRole",
        "roles/:id": "editRole",
        "roles": "roles",

        "home": "home",
        "*notfound": "pageNotFound",
    },

    roles: function() {
        this.triggerMethod("load:view", new RolesView());
    },

    editRole: function(id) {
        this.triggerMethod("load:view", new RolesFormView({
            model: new Role({id: id}),
        }));
    },

    newRole: function() {
        this.triggerMethod("load:view", new RolesFormView({
            model: new Role(),
        }));
    },

    home: function() {
        this.triggerMethod("load:view", new HomeView());
    },

    pageNotFound: function() {
        this.triggerMethod("load:view", new PageNotFoundView());
    },

    onRoute: function(name, path, args) {
        console.log(name, path, args);
    },

});

module.exports = KoalaRouter;
