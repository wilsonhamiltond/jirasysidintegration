process.env.NODE_ENV = 'test';

import * as chai from 'chai';
var chaiHttp = require('chai-http');

import { app } from '../api/server';

let should = chai.should();

chai.use(chaiHttp);
describe('Jira SYSID API', () => {

    
  it( 'Sernding ticket to Jira', (done) =>{
    chai.request(app)
      .get('/api/jira/ESG-22/sync')
      .end( (error, result) =>{
        result.should.have.status(200);
        result.body.should.have.status(true);
        if(error)
          done(error);
        done();
      });
  });
  
  it( 'Update SYSID ticket', (done) =>{
    chai.request(app)
      .get('/api/jira/' + 30 + '/sync' )
      .end( (error, result) =>{
        result.should.have.status(200);
        result.body.should.have.status( true );
        if(error)
          done(error);
        done();
      });
  });
  
});