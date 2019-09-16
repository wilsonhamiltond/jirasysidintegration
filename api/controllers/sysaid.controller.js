"use strict";
var jira_model_1 = require('../models/jira.model');
var sysaid_model_1 = require('../models/sysaid.model');
var SysaidController = (function () {
    function SysaidController() {
        this.jiraModel = new jira_model_1.JiraModel();
        this.sysaidModel = new sysaid_model_1.SysaidModel();
    }
    SysaidController.prototype.syncWithJira = function (req, res) {
        var _this = this;
        var srId = req.params['srId'];
        this.sysaidModel.syncWithJira(srId).then(function (sr) {
            _this.jiraModel.createIssue(sr).then(function (issueKeys) {
                _this.jiraModel.syncWithSysAid(issueKeys["key"]).then(function (issue) {
                    _this.sysaidModel.updateSRFromJira(issue).then(function (srUpdate) {
                        res.json({
                            status: true,
                            issue: issueKeys,
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
    SysaidController.prototype.getFields = function (req, res) {
        this.sysaidModel.getFields().then(function (result) {
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
    SysaidController.prototype.getFieldOptions = function (req, res) {
        var srId = req.params['fieldKey'];
        this.sysaidModel.getFieldOptions(srId).then(function (result) {
            res.json({
                status: true,
                options: result['values']
            });
        }).catch(function (error) {
            res.send({
                status: false,
                message: error
            });
        });
    };
    return SysaidController;
}());
exports.SysaidController = SysaidController;
//# sourceMappingURL=sysaid.controller.js.map