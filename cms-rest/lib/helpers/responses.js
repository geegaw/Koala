"use strict";

class Responses {
    static json(res, payload){
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(payload));
    }

    static unauthorized(res) {
        res.sendStatus(401);
    }

    static pageNotFound(res) {
        res.sendStatus(404);
    }

    static error(res, msg) {
        console.error(msg);
        res.sendStatus(500);
    }
}

module.exports = Responses;
