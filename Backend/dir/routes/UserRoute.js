"use strict";
exports.__esModule = true;
var express = require("express");
var User_1 = require("../models/User");
var Encryptor = require("../helper/Encryptor");
var passport = require('../config/passport');
var router = express.Router();
exports.userRoute = router
    .get('/', function (req, res) {
    console.log('req.session', req.session);
    console.log('req.sessionID', req.sessionID);
    console.log('req.user', req.user);
    if (req.user) {
        res.send({ user: { username: req.user.username, posts: req.user.posts } });
    }
    else {
        res.status(401).send({ user: false });
    }
})
    .post('/login', function (req, res, next) {
    console.log('req.body', req.body);
    next();
}, passport.authenticate('local'), function (req, res) {
    console.log('req.user', req.user);
    if (req.user) {
        var _a = req.user, username = _a.username, email = _a.email, posts = _a.posts;
        res.send({ user: { username: username, email: email, posts: posts } });
    }
    else {
        res.sendStatus(401);
    }
})
    .post('/signup', function (req, res, next) {
    var _a = req.body, username = _a.username, email = _a.email, password = _a.password;
    console.log('req.body', req.body);
    User_1.User.findOne({ username: username })
        .then(function (user) {
        if (!user) {
            var newUser = new User_1.User({ username: username, email: email, password: Encryptor.encryptString(password) });
            newUser.save()
                .then(function (result) {
                console.log('saved user result', result);
                next();
            })["catch"](function (err) { return console.log(err); });
        }
        else {
            res.send('Username already exists');
        }
    });
}, passport.authenticate('local'), function (req, res) {
    console.log('req.user', req.user);
    if (req.user) {
        var _a = req.user, username = _a.username, email = _a.email, posts = _a.posts;
        res.send({ user: { username: username, email: email, posts: posts } });
    }
    else {
        res.sendStatus(401);
    }
})
    .get('/logout', function (req, res, next) {
    if (req.user) {
        req.session.destroy(null);
        res.clearCookie('connect.sid');
        console.log('logout user', req.user);
        return res.json({ msg: 'logged user out' });
    }
    else {
        res.json({ msg: 'no user to log out' });
    }
});
//# sourceMappingURL=UserRoute.js.map