"use strict";
var mongoose = require('mongoose');
var q_1 = require('q');
var config = require('config');
var UserModel = (function () {
    function UserModel() {
        var schema = new mongoose.Schema({
            name: {
                type: String
            },
            password: {
                type: String
            },
            dateAt: {
                type: Date,
                default: Date()
            }
        });
        this.UserSchema = mongoose.model('user', schema);
    }
    UserModel.prototype.login = function (user) {
        var def = q_1.defer();
        this.UserSchema.find({ name: user.userName, password: user.password }, function (error, docs) {
            if (error) {
                def.reject(error);
            }
            else {
                def.resolve(docs);
            }
        });
        return def.promise;
    };
    UserModel.prototype.createDefault = function () {
        var def = q_1.defer();
        var defaultUser = config.get('defaultUser');
        var admin = new this.UserSchema({
            name: defaultUser['name'],
            password: defaultUser['password']
        });
        admin.save(function (error) {
            if (error) {
                def.reject(error);
            }
            else {
                def.resolve(admin);
                console.log('Admin user created');
            }
        });
        return def.promise;
    };
    return UserModel;
}());
exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map