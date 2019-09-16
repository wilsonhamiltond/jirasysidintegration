"use strict";
var mongoose = require('mongoose');
var q_1 = require('q');
var option_model_1 = require('./option.model');
exports.MappingSchema = new mongoose.Schema({
    name: {
        type: String
    },
    sysaidField: {
        type: String,
        required: true
    },
    jiraField: {
        type: String,
        required: true
    },
    jiraProperty: {
        type: String
    },
    options: [option_model_1.OptionSchema],
    dateAt: {
        type: Date,
        default: Date()
    }
});
var MappingModel = (function () {
    function MappingModel() {
        this.mappingMongoModel = mongoose.model('mapping', exports.MappingSchema);
    }
    MappingModel.prototype.list = function () {
        var def = q_1.defer();
        this.mappingMongoModel.find({}, function (error, docs) {
            if (error) {
                def.reject(error);
            }
            else {
                def.resolve(docs);
            }
        });
        return def.promise;
    };
    MappingModel.prototype.get = function (_id) {
        var def = q_1.defer();
        this.mappingMongoModel.find({ _id: _id }, function (error, docs) {
            if (error) {
                def.reject(error);
            }
            else {
                def.resolve(docs);
            }
        });
        return def.promise;
    };
    MappingModel.prototype.delete = function (_id) {
        var def = q_1.defer();
        this.mappingMongoModel.remove({ _id: _id }, function (error) {
            if (error) {
                def.reject(error);
            }
            else {
                def.resolve('Mapping delete success');
            }
        });
        return def.promise;
    };
    MappingModel.prototype.save = function (_mapping) {
        var def = q_1.defer();
        var mapping = new this.mappingMongoModel(_mapping);
        mapping.save(function (error, doc) {
            if (error) {
                def.reject(error);
            }
            else {
                def.resolve("Mapping save success.");
            }
        });
        return def.promise;
    };
    MappingModel.prototype.update = function (_id, _mapping) {
        var def = q_1.defer();
        this.mappingMongoModel.update({ _id: _id }, _mapping, {}, function (error, doc) {
            if (error) {
                def.reject(error);
            }
            else {
                def.resolve("Mapping update success.");
            }
        });
        return def.promise;
    };
    return MappingModel;
}());
exports.MappingModel = MappingModel;
//# sourceMappingURL=mapping.model.js.map