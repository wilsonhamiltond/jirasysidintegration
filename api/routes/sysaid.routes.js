"use strict";
var sysaid_controller_1 = require('../controllers/sysaid.controller');
var SysaidRoutes = (function () {
    function SysaidRoutes(app) {
        var _this = this;
        this.sysaidController = new sysaid_controller_1.SysaidController();
        app.get('/api/sysaid/:srId/sync', function (req, res) { return _this.sysaidController.syncWithJira(req, res); });
        app.get('/api/sysaid/field', function (req, res) { return _this.sysaidController.getFields(req, res); });
        app.get('/api/sysaid/field/:fieldKey/option', function (req, res) { return _this.sysaidController.getFieldOptions(req, res); });
    }
    return SysaidRoutes;
}());
exports.SysaidRoutes = SysaidRoutes;
//# sourceMappingURL=sysaid.routes.js.map