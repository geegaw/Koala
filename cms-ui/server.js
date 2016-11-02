"use strict";

const express = require("express");
const config = require("./config");
const morgan = require("morgan");

let checkAuth = require("./lib/authentication/middleware");
let app = express();

app.use("/", require("./lib/status/routes"));

app.use(morgan("combined"));

app.use("/public", express.static(__dirname + "/public"));
app.use("/login", require("./lib/authentication/routes"));

app.use(checkAuth);
app.use("/api", require("./lib/api/routes"));
app.get("/*", function(req, res) {
    res.sendFile(__dirname + "/lib/templates/index.html");
});

app.listen(config.port, function(){
    console.log("Koala CMS UI running on port: " + config.port);
});
