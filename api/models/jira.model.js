"use strict";
var config = require('config');
var q_1 = require('q');
var utils_1 = require('../utils/utils');
var service_model_1 = require('./service.model');
var request = require('request');
var JiraModel = (function () {
    function JiraModel() {
        var jConfig = config.get('JiraConfig');
        this.auth = new Buffer(jConfig['userName'] + ':' + jConfig['password']).toString('base64');
        this.serviceModel = new service_model_1.ServiceModel();
        this.services = config.get('JiraConfig.services');
    }
    JiraModel.prototype.syncWithSysAid = function (issueId) {
        var def = q_1.defer();
        var jConfig = config.get('JiraConfig');
        request({
            method: 'GET',
            url: "http://" + jConfig['hostName'] + ":" + jConfig['port'] + this.services['getIssue'] + issueId,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + this.auth
            }
        }, function (error, res, data) {
            if (error) {
                def.reject(error);
            }
            else {
                def.resolve(typeof data == 'string' ? JSON.parse(data) : data);
            }
        });
        return def.promise;
    };
    JiraModel.prototype.createIssue = function (sr) {
        var _this = this;
        var def = q_1.defer();
        this.createIssueFromSysAid(sr).then(function (issue) {
            var jConfig = config.get('JiraConfig');
            request({
                method: 'POST',
                url: "http://" + jConfig['hostName'] + ":" + jConfig['port'] + _this.services['createIssue'],
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic " + _this.auth
                },
                json: issue
            }, function (error, res, data) {
                if (error || data.errors) {
                    def.reject(error || data.errors);
                }
                else {
                    def.resolve(typeof data == 'string' ? JSON.parse(data) : data);
                }
            });
        }).catch(function (error) {
            def.reject(error);
        });
        return def.promise;
    };
    JiraModel.prototype.createIssueFromSysAid = function (sr) {
        var def = q_1.defer(), fields = {};
        this.serviceModel.get('jira').then(function (service) {
            for (var _i = 0, _a = service['mappings']; _i < _a.length; _i++) {
                var mapping = _a[_i];
                mapping = mapping._doc;
                var items = {};
                for (var _b = 0, _c = mapping['options']; _b < _c.length; _b++) {
                    var option = _c[_b];
                    items[option['sysaidOption']] = option['jiraOption'];
                }
                var value = sr[mapping['sysaidField']] || utils_1.Utils.getKeyFromSysAid(mapping['sysaidField'], sr.info, items);
                if (value !== '') {
                    var filed = {
                        sysaidKey: mapping['sysaidField'],
                        jiraKey: mapping['jiraField'],
                        value: value
                    };
                    if (mapping['jiraProperty'] != '') {
                        filed['property'] = mapping['jiraProperty'];
                    }
                    fields[mapping['jiraField']] = utils_1.Utils.getValueFromObject('property', filed);
                }
            }
            def.resolve({
                "fields": fields
            });
        }).catch(function (error) {
            def.reject({
                "fields": fields
            });
        });
        return def.promise;
    };
    JiraModel.prototype.getFields = function () {
        var def = q_1.defer();
        var jConfig = config.get('JiraConfig');
        request({
            method: 'GET',
            url: "http://" + jConfig['hostName'] + ":" + jConfig['port'] + this.services['getFields'],
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + this.auth
            }
        }, function (error, res, data) {
            if (error) {
                def.reject(error);
            }
            else {
                def.resolve(typeof data == 'string' ? JSON.parse(data) : data);
            }
        });
        return def.promise;
    };
    JiraModel.prototype.getFiledOptions = function (fieldKey) {
        var def = q_1.defer();
        var jConfig = config.get('JiraConfig');
        request({
            method: 'GET',
            url: "http://" + jConfig['hostName'] + ":" + jConfig['port'] + this.services['getFieldOptions'],
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + this.auth
            }
        }, function (error, res, data) {
            if (error) {
                def.reject(error);
            }
            else {
                var result = typeof data == 'string' ? JSON.parse(data) : data;
                var projects = result[fieldKey + 's'];
                var issuetypes = result.projects[0][fieldKey + 's'];
                var values = projects || issuetypes || result.projects[0].issuetypes[0].fields[fieldKey].allowedValues;
                def.resolve(values);
            }
        });
        return def.promise;
    };
    return JiraModel;
}());
exports.JiraModel = JiraModel;
//# sourceMappingURL=jira.model.js.map