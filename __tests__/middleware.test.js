'use strict';

const {server} = require('../src/server');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
const auth = require('../auth/auth-middleware');

describe('middleware authentication', () => {
  let testUser = {username: 'travis', password: 'password'};

});