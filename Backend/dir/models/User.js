"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [{
            description: {
                type: String,
                required: false
            },
            imageURL: {
                type: String,
                required: false
            },
            created_at: {
                type: Date,
                required: true
            },
            comments: [{
                    username: {
                        type: String,
                        required: true
                    },
                    comment: {
                        type: String,
                        required: true
                    },
                    likes: {
                        type: Number,
                        required: false
                    },
                    created_at: {
                        type: Date,
                        required: true
                    }
                }]
        }]
});
exports.User = mongoose.model('User', UserSchema);
//# sourceMappingURL=User.js.map