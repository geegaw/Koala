"use strict";

const Backbone = require("backbone");

const Field = Backbone.Model.extend({

    defaults: {
        name: "",
    },

});

module.exports = Field;
