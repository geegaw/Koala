"use strict";

const express = require("express");
const config = require("./config");
const morgan = require("morgan");

let mongo = require("./lib/db/Mongo");
let app = express();

app.use("/", require("./lib/status/routes"));

app.use(morgan("combined"));
app.use("/", require("./lib/authentication/routes"));
app.use("/", require("./lib/authentication/middleware"));
app.use("/", require("./lib/api/routes"));


mongo.connect().then(function(){
    app.listen(config.port, function(){
        console.log("Koala CMS Rest api running on port: " + config.port);
    });
}).catch(console.error);
