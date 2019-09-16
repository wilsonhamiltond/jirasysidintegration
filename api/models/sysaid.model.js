"use strict";
var config = require('config');
var q_1 = require('q');
var service_model_1 = require('./service.model');
var request = require('request');
var headers = { "Content-Type": "application/json" };
var SysaidModel = (function () {
    function SysaidModel() {
        var sConfig = config.get('SYSIdConfig');
        this.services = config.get('SYSIdConfig.services');
        this.serviceModel = new service_model_1.ServiceModel();
    }
    SysaidModel.prototype.login = function () {
        var def = q_1.defer();
        var sConfig = config.get('SYSIdConfig');
        var loginData = {
            "account_id": sConfig['accoundId'],
            "user_name": sConfig['userName'],
            "password": sConfig['password']
        };
        request({
            method: 'POST',
            url: "http://" + sConfig['hostName'] + ":" + sConfig['port'] + this.services['login'],
            headers: {
                "Content-Type": "application/json"
            },
            json: loginData
        }, function (error, res, data) {
            if (error) {
                def.reject(error);
            }
            else {
                var cookie = res.headers['set-cookie'][0];
                def.resolve({
                    data: data,
                    cookie: cookie
                });
            }
        });
        return def.promise;
    };
    SysaidModel.prototype.syncWithJira = function (srId) {
        var _this = this;
        var def = q_1.defer();
        var sConfig = config.get('SYSIdConfig');
        this.login().then(function (result) {
            request({
                method: 'GET',
                url: "http://" + sConfig['hostName'] + ":" + sConfig['port'] + _this.services['sr'] + srId,
                headers: {
                    'Cookie': result['cookie']
                }
            }, function (error, res, data) {
                if (error) {
                    def.reject(error);
                }
                else {
                    def.resolve(JSON.parse(data));
                }
            });
        }).catch(function (error) {
            def.reject(error);
        });
        return def.promise;
    };
    SysaidModel.prototype.updateSRFromJira = function (issue) {
        var _this = this;
        var def = q_1.defer();
        var sConfig = config.get('SYSIdConfig');
        this.mapIssueToSR(issue).then(function (sr) {
            _this.login().then(function (result) {
                request({
                    method: 'PUT',
                    url: "http://" + sConfig['hostName'] + ":" + sConfig['port'] + _this.services['sr'] + sr['id'],
                    json: sr,
                    headers: {
                        "Content-Type": "application/json",
                        "Cookie": result['cookie']
                    },
                }, function (error, res, data) {
                    if (error) {
                        def.reject(error);
                    }
                    else {
                        if (!data) {
                            def.resolve(sr);
                        }
                        else {
                            def.reject(data);
                        }
                    }
                });
            }).catch(function (error) {
                def.reject(error);
            });
        }).catch(function (error) {
            def.reject(error);
        });
        return def.promise;
    };
    SysaidModel.prototype.mapIssueToSR = function (issue) {
        var def = q_1.defer();
        var sr = {
            info: []
        };
        this.serviceModel.get('sysaid').then(function (service) {
            for (var _i = 0, _a = service['mappings']; _i < _a.length; _i++) {
                var mapping = _a[_i];
                mapping = mapping._doc;
                var items = {};
                for (var _b = 0, _c = mapping['options']; _b < _c.length; _b++) {
                    var option = _c[_b];
                    items[option['jiraField']] = option['sysaidField'];
                }
                var field = issue[mapping['jiraField']] || issue.fields[mapping['jiraField']];
                if (field) {
                    if (mapping['jiraProperty'] != '') {
                        field = field[mapping['jiraProperty']];
                    }
                    if (mapping['sysaidField'] == 'id') {
                        sr[mapping['sysaidField']] = issue.fields[mapping["jiraField"]];
                    }
                    else {
                        sr.info.push({
                            "key": mapping['sysaidField'],
                            "value": field
                        });
                    }
                }
            }
            def.resolve(sr);
        });
        return def.promise;
    };
    SysaidModel.prototype.getFields = function () {
        var _this = this;
        var sConfig = config.get('SYSIdConfig');
        var def = q_1.defer();
        this.login().then(function (result) {
            request({
                method: 'GET',
                url: "http://" + sConfig['hostName'] + ":" + sConfig['port'] + _this.services['getFields'],
                headers: {
                    'Cookie': result['cookie']
                }
            }, function (error, res, data) {
                if (error) {
                    def.reject(error);
                }
                else {
                    def.resolve(JSON.parse(data).info);
                }
            });
        }).catch(function (error) {
            def.reject(error);
        });
        return def.promise;
    };
    SysaidModel.prototype.getFieldOptions = function (srId) {
        var _this = this;
        var sConfig = config.get('SYSIdConfig');
        var def = q_1.defer();
        this.login().then(function (result) {
            request({
                method: 'GET',
                url: "http://" + sConfig['hostName'] + ":" + sConfig['port'] + _this.services['getFieldOption'] + "/" + srId,
                headers: {
                    'Cookie': result['cookie']
                }
            }, function (error, res, data) {
                if (error) {
                    def.reject(error);
                }
                else {
                    def.resolve(JSON.parse(data));
                }
            });
        }).catch(function (error) {
            def.reject(error);
        });
        return def.promise;
    };
    return SysaidModel;
}());
exports.SysaidModel = SysaidModel;
//# sourceMappingURL=sysaid.model.js.map