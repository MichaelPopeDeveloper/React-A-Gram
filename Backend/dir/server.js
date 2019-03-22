"use strict";
exports.__esModule = true;
var bodyParser = require("body-parser");
var express = require("express");
var logger = require("morgan");
var Server = (function () {
    function Server() {
        this.port = process.env.PORT || 3001;
        this.app = express();
        this.config();
        this.routes();
        this.listen();
        this.api();
    }
    Server.bootstrap = function () {
        return new Server();
    };
    Server.prototype.api = function () {
    };
    Server.prototype.config = function () {
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
    };
    Server.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("Listening on port " + _this.port);
        });
    };
    Server.prototype.routes = function () {
        this.app.use('/test', function (req, res) { return res.send('Go beyond!'); });
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=server.js.map