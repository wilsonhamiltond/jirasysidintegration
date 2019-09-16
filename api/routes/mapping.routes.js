"use strict";
var mapping_controller_1 = require('../controllers/mapping.controller');
var MappingRoutes = (function () {
    function MappingRoutes(app) {
        var _this = this;
        this.mappingController = new mapping_controller_1.MappingController();
        app.get('/api/mapping', function (req, res) { return _this.mappingController.list(req, res); });
        app.get('/api/mapping/:_id', function (req, res) { return _this.mappingController.get(req, res); });
        app.post('/api/mapping', function (req, res) { return _this.mappingController.save(req, res); });
        app.put('/api/mapping/:_id', function (req, res) { return _this.mappingController.update(req, res); });
        app.delete('/api/mapping', function (req, res) { return _this.mappingController.delete(req, res); });
    }
    return MappingRoutes;
}());
exports.MappingRoutes = MappingRoutes;
//# sourceMappingURL=mapping.routes.js.map