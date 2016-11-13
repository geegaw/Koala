"use strcit";

"use strict";

const Marionette = require("backbone.marionette");
const RoleItemView = require("./roleItemView");

const RolesCollectionView = Marionette.CollectionView.extend({
    childView: RoleItemView,
});

module.exports = RolesCollectionView;
