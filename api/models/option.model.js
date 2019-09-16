"use strict";
var mongoose = require('mongoose');
var q_1 = require('q');
var mapping_model_1 = require('./mapping.model');
exports.OptionSchema = new mongoose.Schema({
    sysaidOption: {
        type: String
    },
    jiraOption: {
        type: String
    },
    dateAt: {
        type: Date,
        default: Date()
    }
});
var OptionModel = (function () {
    function OptionModel() {
        this.optionMongoModel = mongoose.model('option', exports.OptionSchema);
        this.mappingModel = new mapping_model_1.MappingModel();
    }
    OptionModel.prototype.list = function (_mappingId) {
        var def = q_1.defer();
        this.mappingModel.get(_mappingId).then(function (docs) {
            if (docs['length'] <= 0) {
                def.reject('Mapping no found');
                return;
            }
            def.resolve(docs[0]._doc.options);
        }).catch(function (error) {
            def.reject(error);
        });
        return def.promise;
    };
    OptionModel.prototype.get = function (_mappingId, _id) {
        var def = q_1.defer();
        this.mappingModel.get(_mappingId).then(function (docs) {
            if (docs['length'] <= 0) {
                def.reject('Mapping no found');
                return;
            }
            var option = docs[0]._doc.options.id(_id);
            def.resolve(option);
        }).catch(function (error) {
            def.reject(error);
        });
        return def.promise;
    };
    OptionModel.prototype.delete = function (_mappingId, _id) {
        var def = q_1.defer();
        this.mappingModel.get(_mappingId).then(function (docs) {
            if (docs['length'] <= 0) {
                def.reject('Mapping no found');
                return;
            }
            var mapping = docs[0];
            mapping.options.id(_id).remove();
            mapping.save(function (error) {
                if (error) {
                    def.reject(error);
                }
                else {
                    def.resolve('Option delete success');
                }
            });
        }).catch(function (error) {
            def.reject(error);
        });
        return def.promise;
    };
    OptionModel.prototype.save = function (_mappingId, _option) {
        var def = q_1.defer();
        this.mappingModel.get(_mappingId).then(function (docs) {
            if (docs['length'] <= 0) {
                def.reject('Mapping no found');
                return;
            }
            var mapping = docs[0];
            mapping.options.push(_option);
            mapping.save(function (error) {
                if (error) {
                    def.reject(error);
                }
                else {
                    def.resolve("Option save success.");
                }
            });
        }).catch(function (error) {
            def.reject(error);
        });
        return def.promise;
    };
    OptionModel.prototype.update = function (_mappingId, _id, _option) {
        var def = q_1.defer();
        this.mappingModel.get(_mappingId).then(function (docs) {
            if (docs['length'] <= 0) {
                def.reject('Mapping no found');
                return;
            }
            var mapping = docs[0];
            var option = mapping.options.id(_id);
            option.sysaidOption = _option.sysaidOption;
            option.jiraOption = _option.jiraOption;
            mapping.save(function (error) {
                if (error) {
                    def.reject(error);
                }
                else {
                    def.resolve("Option save success.");
                }
            });
        }).catch(function (error) {
            def.reject(error);
        });
        return def.promise;
    };
    return OptionModel;
}());
exports.OptionModel = OptionModel;
//# sourceMappingURL=option.model.js.map