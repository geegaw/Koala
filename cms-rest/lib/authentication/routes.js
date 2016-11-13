"use strict";

const express = require("express");
const Responses = require("../helpers/responses");
const config = require("../../config");
const User = require("../models/User");
const Session = require("../models/Session");

let AuthenticationRouter = express.Router();

AuthenticationRouter.post("/login", function(req, res){
    let post = req.body;
    if (post.username === config.root.username &&  post.password === config.root.password){
        let session = new Session({
            userId: "root"
        });
        session.save().then(function(){
            Responses.json(res, {
                user: {
                    id: "root",
                    username: "root",
                },
                sessionId: session.id,
            });
        });
    } else {
        let user = new User();
        user.authenticate({username: post.username, password: post.password}).then(function(valid) {
            if (valid) {
                let session = new Session({
                    data: {
                        userId: user.id,
                    }
                });
                session.save().then(function() {
                    Responses.json(res, {
                        user: User.toJSON(),
                        sessionId: session.id,
                    });
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
