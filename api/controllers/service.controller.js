"use strict";
var service_model_1 = require('../models/service.model');
var ServiceController = (function () {
    function ServiceController() {
        this.serviceModel = new service_model_1.ServiceModel();
    }
    ServiceController.prototype.update = function (req, res) {
        var service = req.body, _type = req.params['_type'];
        this.serviceModel.update(_type, service).then(function (message) {
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
    ServiceController.prototype.get = function (req, res) {
        var _type = req.params['_type'];
        this.serviceModel.get(_type).then(function (service) {
            res.json({
                status: true,
                service: service
            });
        }).catch(function (error) {
            res.send({
                status: false,
                message: error
            });
        });
    };
    return ServiceController;
}());
exports.ServiceController = ServiceController;
//# sourceMappingURL=service.controller.js.map