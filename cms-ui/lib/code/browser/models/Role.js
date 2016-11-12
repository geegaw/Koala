"use strict";

const Backbone = require("backbone");

const Role = Backbone.Model.extend({

    url: function(){
        return  "/api/roles" + (this.id ? "/" + this.id : "");
    },

});

module.exports = Role;
