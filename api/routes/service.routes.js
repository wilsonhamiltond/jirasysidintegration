"use strict";
var service_controller_1 = require('../controllers/service.controller');
var ServiceRoutes = (function () {
    function ServiceRoutes(app) {
        var _this = this;
        this.serviceController = new service_controller_1.ServiceController();
        app.get('/api/service/:_type', function (req, res) { return _this.serviceController.get(req, res); });
        app.put('/api/service/:_type', function (req, res) { return _this.serviceController.update(req, res); });
    }
    return ServiceRoutes;
}());
exports.ServiceRoutes = ServiceRoutes;
//# sourceMappingURL=service.routes.js.map