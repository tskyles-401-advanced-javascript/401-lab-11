'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dataModel = require('@tskyles/mongo-model');
const schema = require('../schemas/users-schema');

let SECRET = 'Donttellitssecret';

/**
 * @class Users
 * @extends {dataModel}
 */
class Users extends dataModel {
  constructor(){
    super(schema);
  }
  /**
 * @returns token
 * @memberof Users
 */
  generateToken(){
    let token = jwt.sign({username: this.username },  SECRET);
    return token;
  }
  //TODO
  async authenticateBasic(user, pass){
    let valid = await bcrypt.compare(pass );
  }
}