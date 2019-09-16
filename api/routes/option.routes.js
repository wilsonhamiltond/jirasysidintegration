"use strict";
var option_controller_1 = require('../controllers/option.controller');
var OptionRoutes = (function () {
    function OptionRoutes(app) {
        var _this = this;
        this.optionController = new option_controller_1.OptionController();
        app.get('/api/mapping/:_mappingId/option', function (req, res) { return _this.optionController.list(req, res); });
        app.get('/api/mapping/:_mappingId/option/:_id', function (req, res) { return _this.optionController.get(req, res); });
        app.post('/api/mapping/:_mappingId/option', function (req, res) { return _this.optionController.save(req, res); });
        app.put('/api/mapping/:_mappingId/option/:_id', function (req, res) { return _this.optionController.update(req, res); });
        app.delete('/api/mapping/:_mappingId/option', function (req, res) { return _this.optionController.delete(req, res); });
    }
    return OptionRoutes;
}());
exports.OptionRoutes = OptionRoutes;
//# sourceMappingURL=option.routes.js.map