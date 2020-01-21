'use strict';


const {server} = require('../src/server');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
const jwt = require('jsonwebtoken');

describe('Route Testing', () => {

  let userObj = {
    username: 'Trevor',
    password: 'ForTestingPurposes',
  };

  let tokenID;

  it('/Signup route creates new user', () => {
    return mockRequest.post('/signup')
      .send(userObj)
      .then(data => {
        let token = jwt.verify(data.text, 'yourpasswordisplaintext');
        tokenID = token.iat;
        expect(token.iat).toBeDefined();
      });
  });

  it('Throw error with invalid object', () => {
    return mockRequest.post('/signup')
      .send({name: 'blah', password: 5})
      .then(data => {
        expect(data.text).toEqual('Error');
      });
  });

  it('/users returns all users', () => {
    return mockRequest.get('/users')
      .then(data => {
        expect(data.body.count).toEqual(1);
      });
  });

  it('/signin authenticates user', () => {
    return mockRequest.post('/signin')
      .auth(userObj.username, userObj.password)
      .then(results => {
        let token = jwt.verify(results.text, 'yourpasswordisplaintext');
        expect(token.iat).toEqual(tokenID);
      });
  });
});