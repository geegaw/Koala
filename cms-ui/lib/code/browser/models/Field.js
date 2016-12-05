"use strict";

const Backbone = require("backbone");
const camelize = require("../helpers/camelize");

const Field = Backbone.Model.extend({

    defaults: {
        label: "",
        name: "",
    },

    generateName: function() {
        this.set("name", camelize(this.get("label")));
    },
});

module.exports = Field;
