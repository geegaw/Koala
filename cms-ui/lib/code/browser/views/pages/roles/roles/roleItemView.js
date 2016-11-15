"use strict";

const ResultItemView = require("../../../elements/search/resultItemView");

const RoleItemView = ResultItemView.extend({
    template: "pages/roles/role-item",
    className: function(){
        return ResultItemView.prototype.className + " role-item";
    },

    getPermissions: function() {
        return {
            canUpdate: userCan("update_roles"),
            canDelete: userCan("delete_roles"),
        };
    },

});

module.exports = RoleItemView;
