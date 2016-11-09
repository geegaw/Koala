"use strict";

const Marionette = require("backbone.marionette");
const KoalaController = require("../controllers/koalaController");

const KoalaRouter = Marionette.AppRouter.extend({

    initialize: function() {
        this.controller = new KoalaController();
    },

    appRoutes: {
        "home": "home",
        "*notfound": "pageNotFound",
    },

    onRoute: function(name, path, args) {
        console.log(name, path, args);
    }
});

module.exports = KoalaRouter;
