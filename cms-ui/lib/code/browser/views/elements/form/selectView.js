"use strict";

const InputView = require("./inputView");

const SelectView = InputView.extend({
    template: "elements/form/select",

    templateContext: function() {
        let context = InputView.prototype.templateContext.apply(this);
        let options = this.getOption("options") || [];

        options.forEach(function(option) {
            options.selected = context.value === option.value;
        });
        delete context.value;

        return Object.assign({}, context, {
            options
        });
    },

    events: {
        "change select": "setValue",
    },

});

module.exports = SelectView;
