"use strict";
process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');
var server_1 = require('../api/server');
var should = chai.should();
chai.use(chaiHttp);
describe('Jira SYSID API', function () {
    it('Sernding ticket to Jira', function (done) {
        chai.request(server_1.app)
            .get('/api/jira/ESG-22/sync')
            .end(function (error, result) {
            result.should.have.status(200);
            result.body.should.have.status(true);
            if (error)
                done(error);
            done();
        });
    });
    it('Update SYSID ticket', function (done) {
        chai.request(server_1.app)
            .get('/api/jira/' + 30 + '/sync')
            .end(function (error, result) {
            result.should.have.status(200);
            result.body.should.have.status(true);
            if (error)
                done(error);
            done();
        });
    });
});
//# sourceMappingURL=jirasysid.test.js.map