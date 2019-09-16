"use strict";
var option_model_1 = require('../models/option.model');
var OptionController = (function () {
    function OptionController() {
        this.optionModel = new option_model_1.OptionModel();
    }
    OptionController.prototype.save = function (req, res) {
        var option = req.body, _mappingId = req.params['_mappingId'];
        this.optionModel.save(_mappingId, option).then(function (message) {
            res.json({
                status: true,
                message: message
            });
        }).catch(function (error) {
            res.send({
                status: false,
                message: error
            });
        });
    };
    OptionController.prototype.update = function (req, res) {
        var option = req.body, _id = req.params['_id'], _mappingId = req.params['_mappingId'];
        this.optionModel.update(_mappingId, _id, option).then(function (message) {
            res.json({
                status: true,
                message: message
            });
        }).catch(function (error) {
            res.send({
                status: false,
                message: error
            });
        });
    };
    OptionController.prototype.get = function (req, res) {
        var id = req.params['_id'], _mappingId = req.params['_mappingId'];
        if (id == '0') {
            res.send({
                status: false,
                message: 'object no found'
            });
        }
        this.optionModel.get(_mappingId, id).then(function (option) {
            res.json({
                status: true,
                option: option
            });
        }).catch(function (error) {
            res.send({
                status: false,
                message: error
            });
        });
    };
    OptionController.prototype.list = function (req, res) {
        var _mappingId = req.params['_mappingId'];
        this.optionModel.list(_mappingId).then(function (docs) {
            res.json({
                status: true,
                options: docs
            });
        }).catch(function (error) {
            res.send({
                status: false,
                message: error
            });
        });
    };
    OptionController.prototype.delete = function (req, res) {
        var id = req.body['_id'], _mappingId = req.params['_mappingId'];
        this.optionModel.delete(_mappingId, id).then(function (result) {
            res.json({
                status: true,
                message: result
            });
        }).catch(function (error) {
            res.send({
                status: false,
                message: error
            });
        });
    };
    return OptionController;
}());
exports.OptionController = OptionController;
//# sourceMappingURL=option.controller.js.map