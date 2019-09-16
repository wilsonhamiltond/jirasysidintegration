"use strict";
var jira_controller_1 = require('../controllers/jira.controller');
var JiraRoutes = (function () {
    function JiraRoutes(app) {
        var _this = this;
        this.jiraController = new jira_controller_1.JiraController();
        app.get('/api/jira/:issueId/sync', function (req, res) { return _this.jiraController.syncWithSysAid(req, res); });
        app.get('/api/jira/field', function (req, res) { return _this.jiraController.getFields(req, res); });
        app.get('/api/jira/field/:fieldKey/option', function (req, res) { return _this.jiraController.getFieldOptions(req, res); });
    }
    return JiraRoutes;
}());
exports.JiraRoutes = JiraRoutes;
//# sourceMappingURL=jira.routes.js.map