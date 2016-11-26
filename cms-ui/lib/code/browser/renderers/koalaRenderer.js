"use strict";

const Marionette = require("backbone.marionette");
let templates = require("../../../../dist/templates/templates");

Marionette.Renderer.render = function(template, data) {
    if (!template) {
        return null;
    }
    return templates[template].render(data);
};
