"use strict";

const ResultItemView = require("../../../elements/search/resultItemView");

const UserItemView = ResultItemView.extend({
    template: "pages/users/user-item",
    className: function() {
        return ResultItemView.prototype.className + " user-item";
    },

    getPermissions: function() {
        return {
            canUpdate: userCan("update_users"),
            canDelete: userCan("delete_users"),
        };
    },

});

module.exports = UserItemView;
