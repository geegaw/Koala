"use strict";

const express = require("express");
const Responses = require("../helpers/responses");
const config = require("../../config");
const User = require("../models/User");

let AuthenticationRouter = express.Router();

AuthenticationRouter.post("/login", function(req, res){
    let post = req.body;
    if (post.username === config.root.username &&  post.password === config.root.password){
        req.session.userId = "root";
        Responses.json(res, {
            user: {
                id: "root",
                username: "root",
            },
            sessionId: req.session.id,
        });
    } else {
        let user = new User();
        user.authenticate({username: post.username, password: post.password}).then(function(valid) {
            if (valid) {
                req.session.userId = User.id;
                Responses.json(res, {
                    user: User.toJSON(),
                    sessionId: req.session.id,
                });
            } else {
                Responses.json(res, {
                    invalid: true,
                });
            }
        }).catch(Responses.error);
    }
});

AuthenticationRouter.post("/logout", function(req, res){
    delete req.session;
    res.sendStatus(200);
});

module.exports = AuthenticationRouter;
