"use strict";
var express = require('express');
var body_parser_1 = require('body-parser');
var config = require('config');
var mongoose = require('mongoose');
var fallback = require('express-history-api-fallback');
var jira_routes_1 = require('./routes/jira.routes');
var sysaid_routes_1 = require('./routes/sysaid.routes');
var user_routes_1 = require('./routes/user.routes');
var mapping_routes_1 = require('./routes/mapping.routes');
var option_routes_1 = require('./routes/option.routes');
var service_routes_1 = require('./routes/service.routes');
var rootPath = __dirname + '/../site/public';
var Server = (function () {
    function Server() {
        this.app = express();
        this.config();
        this.services();
    }
    Server.prototype.config = function () {
        this.app.use(body_parser_1.json());
        this.app.use(body_parser_1.json({ type: 'application/vnd.api+json' }));
        this.app.use(express.static(__dirname + '/../node_modules'));
        this.app.use(express.static(rootPath));
        this.app.use(express.static(__dirname + '/../dist'));
        this.app.use(fallback('index.html', { root: __dirname }));
        var dbConfig = config.get('dbConfig');
        mongoose.connect("mongodb://" + dbConfig['host'] + ":" + dbConfig['port'] + "/" + dbConfig['dbName']);
    };
    Server.prototype.services = function () {
        new sysaid_routes_1.SysaidRoutes(this.app);
        new jira_routes_1.JiraRoutes(this.app);
        new user_routes_1.UserRoutes(this.app);
        new mapping_routes_1.MappingRoutes(this.app);
        new option_routes_1.OptionRoutes(this.app);
        new service_routes_1.ServiceRoutes(this.app);
        this.app.get('/*', function (req, res) {
            res.sendFile('index.html', { root: rootPath });
        });
    };
    Server.prototype.run = function () {
        return this.app.listen(process.env.PORT || 8080, function () {
            console.log("Server running in port: " + (process.env.PORT || 8080));
        });
    };
    Server.bootstrap = function () {
        var server = new Server();
        return server.run();
    };
    return Server;
}());
exports.app = Server.bootstrap();
//# sourceMappingURL=server.js.map