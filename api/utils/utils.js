"use strict";
var Utils = (function () {
    function Utils() {
    }
    Utils.getKeyFromSysAid = function (key, ticketInfo, items) {
        if (typeof ticketInfo == 'object') {
            for (var _i = 0, ticketInfo_1 = ticketInfo; _i < ticketInfo_1.length; _i++) {
                var item = ticketInfo_1[_i];
                if (item["key"] == key) {
                    var value = item["value"];
                    return items[value] || item["value"];
                }
            }
        }
        return '';
    };
    Utils.getValueFromObject = function (prop, object) {
        if (object.hasOwnProperty(prop)) {
            var property = object[prop];
            var obj = {};
            obj[property] = object['value'];
            return obj;
        }
        else {
            return object['value'];
        }
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map