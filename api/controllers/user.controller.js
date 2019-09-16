"use strict";
var user_model_1 = require('../models/user.model');
var UserController = (function () {
    function UserController() {
        this.userModel = new user_model_1.UserModel();
    }
    UserController.prototype.createDefault = function (req, res) {
        this.userModel.createDefault().then(function (message) {
            res.json({
                status: true,
                message: message
            });
        }).catch(function (error) {
            res.send({
                status: false,
                message: new Error(error)
            });
        });
    };
    UserController.prototype.login = function (req, res) {
        var user = req.body;
        this.userModel.login(user).then(function (docs) {
            if (docs['length'] > 0) {
                res.json({
                    status: true,
                    user: docs[0]
                });
            }
            else {
                res.json({
                    status: false,
                    message: 'User name of password are invalid'
                });
            }
        }).catch(function (error) {
            res.send({
                status: false,
                message: error
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map