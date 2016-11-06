"use strict";

const crypto = require("crypto");
const hash = crypto.createHash("sha256");

const config = {
    root: {
        username: "root",
        password: hash.update("root" + "S@1t").digest("hex"),
    },
    port: 3009,
    db: {
        host: "mongodb://localhost:27017/koala",
    },
    session: {
        secret: "$ecret",
    },
};

module.exports =  config;
