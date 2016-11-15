"use strict";

const Marionette = require("backbone.marionette");
const ConfirmationView = require("../confirmationView");

const ResultItemView = Marionette.View.extend({
    className: "search-item",

    ui: {
        delete: ".search-delete",
    },

    templateContext: function() {
        return Object.assign({}, this.getPermissions());
    },

    events: {
        "click @ui.delete": "delete",
    },

    delete: function() {
        let confirmation = new ConfirmationView({
            question: "Are you sure you want to delete " + (this.model.get("name") || "me") + "?",
        });
        this.listenTo(confirmation, "user:confirmed", this.deleteModel.bind(this));
        confirmation.render();
        this.$el.append(confirmation.$el);
    },

    deleteModel: function() {
        this.getUI("delete").addClass("loading");
        this.model.destroy().fail(this.notifyError.bind(this));
    },

    notifyError: function(jqXHR, textStatus, errorThrown) {
        this.getUI("delete").removelass("loading");
        console.error(jqXHR, textStatus, errorThrown);
    },

});

module.exports = ResultItemView;
