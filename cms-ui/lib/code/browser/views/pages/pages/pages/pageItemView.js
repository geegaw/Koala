"use strict";

const ResultItemView = require("../../../elements/search/resultItemView");

const PageItemView = ResultItemView.extend({
    template: "pages/pages/page-item",
    className: function() {
        return ResultItemView.prototype.className + " page-item";
    },

    getPermissions: function() {
        return {
            canUpdate: userCan("update_pages"),
            canDelete: userCan("delete_pages"),
        };
    },

});

module.exports = PageItemView;
