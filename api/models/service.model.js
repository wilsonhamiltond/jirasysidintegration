"use strict";
var mongoose = require('mongoose');
var q_1 = require('q');
var mapping_model_1 = require('./mapping.model');
exports.ServiceSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    mappings: [mapping_model_1.MappingSchema],
    dateAt: {
        type: Date,
        default: Date()
    }
});
var ServiceModel = (function () {
    function ServiceModel() {
        this.serviceModel = mongoose.model('service', exports.ServiceSchema);
    }
    ServiceModel.prototype.get = function (_type) {
        var def = q_1.defer();
        this.serviceModel.find({ type: _type }, function (error, docs) {
            if (error) {
                def.reject(error);
            }
            else {
                if (docs['length'] <= 0) {
                    def.resolve({
                        type: _type,
                        mappings: []
                    });
                }
                else {
                    def.resolve(docs[0]._doc);
                }
            }
        });
        return def.promise;
    };
    ServiceModel.prototype.update = function (_type, _service) {
        var _this = this;
        var def = q_1.defer();
        this.serviceModel.find({ type: _type }, function (error, docs) {
            if (error) {
                def.reject(error);
            }
            else {
                if (docs['length'] <= 0) {
                    var service = new _this.serviceModel(_service);
                    service.save(function (error, doc) {
                        if (error) {
                            def.reject(error);
                        }
                        else {
                            def.resolve("Service update success.");
                        }
                    });
                }
                else {
                    var service = docs[0];
                    service.mappings = _service.mappings;
                    service.save(function (error) {
                        if (error) {
                            def.reject(error);
                        }
                        else {
                            def.resolve("Service update success");
                        }
                    });
                }
            }
        });
        return def.promise;
    };
    return ServiceModel;
}());
exports.ServiceModel = ServiceModel;
//# sourceMappingURL=service.model.js.map