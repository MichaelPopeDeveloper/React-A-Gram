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
        var user = Object.assign({}, req.user._doc);
        delete user.password;
        delete user._id;
        console.log('assign user', user);
        res.send({ user: user });
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
        var user = Object.assign({}, req.user._doc);
        delete user.password;
        delete user._id;
        console.log('assign user', user);
        res.send({ user: user });
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
        var user = Object.assign({}, req.user._doc);
        delete user.password;
        delete user._id;
        console.log('assign user', user);
        res.send({ user: user });
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
            .then(function (result) {
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
        })["catch"](function (error) { return res.send(error); });
        return;
    }
    return res.status(401).send({ user: false });
})
    .post('/editPost', function (req, res) {
    var _a = req.body, postDescriptionText = _a.postDescriptionText, imageURL = _a.imageURL;
    if (req.user) {
        console.log('imageURL', imageURL);
        User_1.User.findOneAndUpdate({ "posts.imageURL": imageURL }, {
            $set: {
                "posts.$.description": postDescriptionText
            }
        })
            .then(function (result) {
            console.log('posts update', result);
            User_1.User.findOneAndUpdate({ "newsfeed.imageURL": imageURL }, {
                $set: {
                    "newsfeed.$.description": postDescriptionText
                }
            })
                .then(function (result) { return console.log('newsfeed update', result); });
        })
            .then(function (result) {
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
        })["catch"](function (error) { return res.send(error); });
        return;
    }
    return res.status(401).send({ user: false });
})
    .post('/deletePost', function (req, res) {
    var imageURL = req.body.imageURL;
    if (req.user) {
        User_1.User.findOneAndUpdate({ _id: req.user._id }, {
            $pull: {
                "posts": { imageURL: imageURL }
            }
        })["catch"](function (error) {
            console.log('posts delete error', error);
        })
            .then(function (result) {
            console.log('delete post', result);
            User_1.User.findOneAndUpdate({ _id: req.user._id }, {
                $pull: {
                    "newsfeed": { imageURL: imageURL }
                }
            })
                .then(function (result) {
                console.log('newsfeed delete', result);
                User_1.User.findById(req.user._id)
                    .then(function (user) {
                    if (user) {
                        delete user.password;
                        delete user._id;
                        res.status(200).send({ user: user });
                    }
                })["catch"](function (error) {
                    res.send(error);
                });
            })["catch"](function (error) {
                console.log('newsfeed delete error', error);
            });
        });
    }
});
//# sourceMappingURL=MainRoute.js.map