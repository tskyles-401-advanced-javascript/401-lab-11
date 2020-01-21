'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dataModel = require('@tskyles/mongo-model');
const schema = require('../schemas/user-schema');

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
 * @param {*} record
 * @returns record
 * @memberof Users
 */
  async saveHashed(record){
    let {username, password} = record;

    password = await bcrypt.hash(record.password, 5);
    let hashedUser = {username: username, password: password};
    await this.post(hashedUser);
    return record;
  }
  /**
 *
 *
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