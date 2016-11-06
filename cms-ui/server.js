"use strict";

const express = require("express");
const config = require("./config");
const morgan = require("morgan");

let checkAuth = require("./lib/code/server/authentication/middleware");
let app = express();

app.use("/", require("./lib/code/server/status/routes"));

app.use(morgan("combined"));

app.use("/public", express.static(__dirname + "/public"));
app.use("/login", require("./lib/code/server/authentication/routes"));

app.use(checkAuth);
app.use("/api", require("./lib/code/server/api/routes"));
app.get("/*", function(req, res) {
    res.sendFile(__dirname + "/lib/templates/index.html");
});

app.listen(config.port, function(){
    console.log("Koala CMS UI running on port: " + config.port);
});
