"use strict";

const Marionette = require("backbone.marionette");

const PagesView = require("../views/pages/pages/pages/pagesView");
const PagesFormView = require("../views/pages/pages/page/pagesFormView");
const Pages = require("../collections/Pages");
const Page = require("../models/Page");

const RolesView = require("../views/pages/roles/roles/rolesView");
const RolesFormView = require("../views/pages/roles/role/rolesFormView");
const Roles = require("../collections/Roles");
const Role = require("../models/Role");

const TemplatesView = require("../views/pages/templates/templates/templatesView");
const TemplatesFormView = require("../views/pages/templates/template/templatesFormView");
const Templates = require("../collections/Templates");
const Template = require("../models/Template");

const UsersView = require("../views/pages/users/users/usersView");
const UsersFormView = require("../views/pages/users/user/userFormView");
const Users = require("../collections/Users");
const User = require("../models/User");

const HomeView = require("../views/pages/homeView");
const PageNotFoundView = require("../views/pages/pageNotFoundView");
const unAuthorizedView = require("../views/pages/unAuthorizedView");

const KoalaRouter = Marionette.AppRouter.extend({

    models: {
        pages: {
            formView: PagesFormView,
            searchView: PagesView,
            collection: Pages,
            model: Page,
            label: "Page",
            permission: "pages",
        },
        roles: {
            formView: RolesFormView,
            searchView: RolesView,
            collection: Roles,
            model: Role,
            label: "Role",
            permission: "roles",
        },
        templates: {
            formView: TemplatesFormView,
            searchView: TemplatesView,
            collection: Templates,
            model: Template,
            label: "Template",
            permission: "templates",
        },
        users: {
            formView: UsersFormView,
            searchView: UsersView,
            collection: Users,
            model: User,
            label: "User",
            permission: "users",
        },
    },

    routes: {

        "home": "home",

        ":model/new": "create",
        ":model/:id": "edit",
        ":model": "search",

        "*notfound": "pageNotFound",
    },

    create: function(modelName) {
        let info = this.getModel(modelName);
        if (info && this.authorized("create_" + info.permission)) {
            this.form(info, modelName, new info.model());
        }
    },

    edit: function(modelName, id) {
        let info = this.getModel(modelName);
        if (info && this.authorized("update_" + info.permission)) {
            this.form(info, modelName, new info.model({
                id: id
            }));
        }
    },

    form: function(info, modelName, model) {
        this.triggerMethod("load:view", new info.formView({
            model: model,
            label: info.label,
            returnTo: "/" + modelName,
        }));
    },

    search: function(modelName) {
        let info = this.getModel(modelName);
        if (info && this.authorized("read_" + info.permission)) {
            this.triggerMethod("load:view", new info.searchView({
                collection: new info.collection(),
            }));
        }
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

    getModel: function(modelName) {
        if (!this.models[modelName]) {
            this.pageNotFound();
            return false;
        }
        return this.models[modelName];
    },

    unAuthorized: function() {
        this.triggerMethod("load:view", new unAuthorizedView());
    },

    onRoute: function(name, path, args) {
        console.log(name, path, args);
    },

});

module.exports = KoalaRouter;
