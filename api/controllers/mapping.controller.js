"use strict";
var mapping_model_1 = require('../models/mapping.model');
var MappingController = (function () {
    function MappingController() {
        this.mappingModel = new mapping_model_1.MappingModel();
    }
    MappingController.prototype.save = function (req, res) {
        var mapping = req.body;
        this.mappingModel.save(mapping).then(function (message) {
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
    MappingController.prototype.update = function (req, res) {
        var mapping = req.body, _id = req.params['_id'];
        this.mappingModel.update(_id, mapping).then(function (message) {
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
    MappingController.prototype.get = function (req, res) {
        var id = req.params['_id'];
        if (id == '0') {
            res.send({
                status: false,
                message: 'object no found'
            });
        }
        this.mappingModel.get(id).then(function (docs) {
            res.json({
                status: true,
                mapping: docs['length'] > 0 ? docs[0] : {}
            });
        }).catch(function (error) {
            res.send({
                status: false,
                message: error
            });
        });
    };
    MappingController.prototype.list = function (req, res) {
        this.mappingModel.list().then(function (docs) {
            res.json({
                status: true,
                mappings: docs
            });
        }).catch(function (error) {
            res.send({
                status: false,
                message: error
            });
        });
    };
    MappingController.prototype.delete = function (req, res) {
        var id = req.body['_id'];
        this.mappingModel.delete(id).then(function (result) {
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
    return MappingController;
}());
exports.MappingController = MappingController;
//# sourceMappingURL=mapping.controller.js.map