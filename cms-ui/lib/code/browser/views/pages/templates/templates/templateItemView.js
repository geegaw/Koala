"use strict";

const ResultItemView = require("../../../elements/search/resultItemView");

const TemplateItemView = ResultItemView.extend({
    template: "pages/templates/template-item",
    className: function() {
        return ResultItemView.prototype.className + " template-item";
    },

    getPermissions: function() {
        return {
            canUpdate: userCan("update_templates"),
            canDelete: userCan("delete_templates"),
        };
    },

});

module.exports = TemplateItemView;
