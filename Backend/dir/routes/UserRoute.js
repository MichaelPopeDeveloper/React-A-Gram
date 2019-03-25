"use strict";
exports.__esModule = true;
var express = require("express");
var User_1 = require("../models/User");
var passport = require('../config/passport');
var router = express.Router();
exports.userRoute = router
    .get('/', function (req, res) {
    console.log('req.session', req.session);
    console.log('req.user', req.user);
    if (req.user) {
        res.send('your logged in');
    }
    else {
        res.send('Bruh you not logged in');
    }
})
    .post('/login', function (req, res, next) {
    console.log('req.body', req.body);
    next();
}, passport.authenticate('local'), function (req, res) {
    console.log('req.user', req.user);
    res.send({ loggedIn: true });
})
    .post('/signup', function (req, res) {
    var _a = req.body, username = _a.username, email = _a.email, password = _a.password;
    console.log('req.body', req.body);
    User_1.User.findOne({ username: username })
        .then(function (user) {
        if (!user) {
            var newUser = new User_1.User({ username: username, email: email, password: password });
            newUser.save()
                .then(function (result) { return console.log(result); })["catch"](function (err) { return console.log(err); });
        }
        else {
            res.send('Username already exists');
        }
    });
}, passport.authenticate('local'), function (req, res) {
    console.log('req.user', req.user);
    if (req.user) {
        res.send({ loggedIn: true });
    }
    else {
        res.send({ loggedIn: false });
    }
})
    .get('/logout', function (req, res, next) {
    console.log('logging out user....');
    req.logout();
    res.send('Logged out!');
});
//# sourceMappingURL=UserRoute.js.map