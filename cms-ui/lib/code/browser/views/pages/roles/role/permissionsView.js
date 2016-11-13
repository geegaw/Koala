"use strict";

const Marionette = require("backbone.marionette");

const Permission = require("../../../../models/Permission");

const CRUD = ["read", "create", "update", "delete"];

const PermissionsView = Marionette.View.extend({
    template: "pages/roles/permissions",
    className: "permissions",

    templateContext: function() {
        return {
            permissionLabels: CRUD,
            permissionsGroup: this.formatPermissions()
        };
    },

    ui: {
        checkbox: "input",
        toggleAll: ".select-all",
        toggleRow: ".select-row",
        toggleColumn: ".select-column",
    },

    events: {
        "change @ui.checkbox": "setValue",
        "click @ui.toggleAll": "toggleAll",
        "click @ui.toggleRow": "toggleRow",
        "click @ui.toggleColumn": "toggleColumn",
    },

    permissions: {
        "users": CRUD,
        "roles": CRUD,
    },

    setValue: function(evt) {
        let value = evt.currentTarget.value;
        let checked = evt.currentTarget.checked;
        if (checked) {
            this.collection.add(new Permission({
                permission: value,
            }));
        } else {
            this.collection.remove(value);
        }
    },

    /**
     * uncheck all if all checkboxes are checked
     */
    toggleAll: function() {
        this.toggleGroupOfCheckboxes(this.$el);
    },

    toggleRow: function(evt) {
        let $this = this.$(evt.currentTarget);
        let $group = $this.parents(".permissions--permissions--group");
        this.toggleGroupOfCheckboxes($group);
    },

    toggleColumn: function(evt) {
        let $this = this.$(evt.currentTarget);
        let index = $this.index();
        let allChecked = true;
        let self = this;
        this.$(".permissions--permissions--group--permissions:not(:eq(0))").each(function(){
            if (!self.$(this).find(".permissions--group--permission:eq(" + index + ") input").is(":checked")){
                allChecked = false;
            }
        });
        this.$(".permissions--permissions--group--permissions:not(:eq(0))").each(function(){
            self.$(this)
                .find(".permissions--group--permission:eq(" + index + ") input")
                .prop("checked", !allChecked)
                .trigger("change");
        });
    },

    toggleGroupOfCheckboxes: function($group) {
        let checked = $group.find("input:checked").length !== $group.find("input").length;
        $group.find("input").prop("checked", checked).trigger("change");
    },

    formatPermissions: function(){
        let permissions = this.permissions;
        let grouped = [];

        let keys = Object.keys(permissions);
        let self = this;
        keys.forEach(function(key){
            grouped.push({
                label: key,
                permissions: permissions[key].map(function(value){
                    value+= "_" + key;
                    return {
                        permission: value,
                        checked: Boolean(self.collection.get(value)),
                    };
                }),
            });
        });
        return grouped;
    },

});

module.exports = PermissionsView;
