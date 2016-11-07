"use strict";

require("jquery");
require("./renderers/koalaRenderer");

const KoalaApp = require("./application/koala");

let koalaApp = new KoalaApp();
koalaApp.start();
