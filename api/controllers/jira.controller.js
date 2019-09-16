"use strict";
var jira_model_1 = require('../models/jira.model');
var sysaid_model_1 = require('../models/sysaid.model');
var JiraController = (function () {
    function JiraController() {
        this.jiraModel = new jira_model_1.JiraModel();
        this.sysaidModel = new sysaid_model_1.SysaidModel();
    }
    JiraController.prototype.syncWithSysAid = function (req, res) {
        var _this = this;
        var issueId = req.params['issueId'];
        this.jiraModel.syncWithSysAid(issueId).then(function (response) {
            _this.sysaidModel.updateSRFromJira(response).then(function (result) {
                res.json({
                    status: true,
                    issue: result,
                    message: 'Update success.'
                });
            }).catch(function (error) {
                res.send({
                    status: false,
                    message: error
                });
            });
        }).catch(function (error) {
            res.send({
                status: false,
                message: error
            });
        });
    };
    JiraController.prototype.getFields = function (req, res) {
        this.jiraModel.getFields().then(function (result) {
            res.json({
                status: true,
                fields: result
            });
        }).catch(function (error) {
            res.send({
                status: false,
                message: error
            });
        });
    };
    JiraController.prototype.getFieldOptions = function (req, res) {
        var fieldKey = req.params['fieldKey'];
        this.jiraModel.getFiledOptions(fieldKey).then(function (result) {
            res.json({
                status: true,
                options: result
            });
        }).catch(function (error) {
            res.send({
                status: false,
                message: error
            });
        });
    };
    return JiraController;
}());
exports.JiraController = JiraController;
//# sourceMappingURL=jira.controller.js.map