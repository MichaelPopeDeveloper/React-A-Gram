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
        var assignUser = Object.assign({}, req.user);
        delete assignUser.password;
        delete assignUser._id;
        res.send({ assignUser: assignUser });
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
        var assignUser = Object.assign({}, req.user);
        delete assignUser.password;
        delete assignUser._id;
        console.log('assign user', assignUser);
        res.send({ assignUser: assignUser });
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
        var assignUser = Object.assign({}, req.user);
        delete assignUser.password;
        delete assignUser._id;
        res.send({ assignUser: assignUser });
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
    return res.json({ msg: 'no user to log out' });
})
    .post('/createPost', function (req, res) {
    var _a = req.body, username = _a.username, imageURL = _a.imageURL, postDescriptionText = _a.postDescriptionText;
    if (req.user) {
        User_1.User.findByIdAndUpdate({ _id: req.user._id }, {
            $push: {
                posts: {
                    imageURL: imageURL,
                    description: postDescriptionText,
                    created_at: new Date(),
                    comments: []
                },
                newsfeed: {
                    username: username,
                    imageURL: imageURL,
                    description: postDescriptionText,
                    created_at: new Date(),
                    comments: []
                }
            }
        })
            .then(function (result) { return console.log(result); })["catch"](function (error) { return res.send(error); });
        User_1.User.findById(req.user._id)
            .then(function (user) {
            if (user) {
                delete user.password;
                delete user._id;
                res.status(200).send({ user: user });
            }
            else {
                res.status(401).send({ msg: 'error' });
            }
        });
        return;
    }
    return res.status(401).send({ user: false });
});
//# sourceMappingURL=UserRoute.js.map