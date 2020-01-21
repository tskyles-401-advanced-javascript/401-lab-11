'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
});

/** 
 * Hashes before saving to DB
*/
userSchema.pre('save', async function (next){
  this.user.password = await bcrypt.hash(this.user.password, 5);
  return next();
});

module.exports = mongoose.model('user', userSchema);