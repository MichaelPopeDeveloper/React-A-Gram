"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var router = express.Router();
exports.AppsRoute = router
    .get('/weatherapp', function (req, res) {
    res.sendFile(path.join(__dirname, '../../public/Views/WeatherCast_View/build', 'index.html'));
})
    .get('/podomoro', function (req, res) {
    res.sendFile(path.join(__dirname, '../../public/Views/Podomoro_View/build', 'index.html'));
});
//# sourceMappingURL=AppsRoute.js.map