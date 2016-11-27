"use strict";

const Backbone = require("backbone");

const Page = Backbone.Model.extend({

    defaults: {
        title: "",
    },

    urlRoot: "/api/model/page",

});

module.exports = Page;
