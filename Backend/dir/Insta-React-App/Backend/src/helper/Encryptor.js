"use strict";
exports.__esModule = true;
var bcrypt = require("bcryptjs");
exports.encryptString = function (string) {
    var salt = bcrypt.genSaltSync(12);
    var hash = bcrypt.hashSync(string, salt);
    return hash;
};
exports.compareEncryptedString = function (string, hash) {
    return bcrypt.compareSync(string, hash);
};
//# sourceMappingURL=Encryptor.js.map