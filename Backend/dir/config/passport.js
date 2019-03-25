"use strict";
exports.__esModule = true;
var passport = require("passport");
var User_1 = require("../models/User");
var LocalStrategy = require('passport-local');
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, function (username, password, done) {
    User_1.User.findOne({ username: username })
        .then(function (user) {
        if (!user) {
            console.log('you done offed');
            console.log(user);
            return done(null, false, { errors: { 'email or password': 'is invalid' } });
        }
        return done(null, user);
    })["catch"](done);
}));
passport.serializeUser(function (user, done) {
    console.log('=== serialize ... called ===');
    console.log(user);
    console.log('---------');
    done(null, { _id: user._id });
});
passport.deserializeUser(function (id, done) {
    console.log('DEserialize ... called');
    User_1.User.findOne({ _id: id }, function (err, user) {
        console.log('======= DESERILAIZE USER CALLED ======');
        console.log(user);
        console.log('--------------');
        done(null, user);
    });
});
module.exports = passport;
//# sourceMappingURL=passport.js.map