"use strict";
const config = {
    api: {
        host: "http://localhost:3009",
    },
    port: 3010,
    hash: {
        algo: "sha256",
        digest: "hex",
        salt: "S@1t",
    },
    session: {
        secret: "$ecret",
    },
    debug: true,
};

module.exports =  config;
