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
  /**
 * @param {*} user
 * @param {*} pass
 * @returns user
 * @memberof Users
 */
  async authenticateBasic(user, pass){
    let getUser = await schema.find({username: user});
    let userPass = getUser[0].password;

    let valid = await bcrypt.compare(pass, userPass);
    return valid? user: Promise.reject();
  }
}

module.exports = Users;