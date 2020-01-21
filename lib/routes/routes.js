'use strict';

const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../docs/config/swagger.json');
const users = require('../models/users-model');
const auth = require('../middleware/auth/auth-middleware');

router.get('/', (req, res, next) => {
  res.json('Welcome!');
});
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));
router.get('/users', getUsers);
router.post('/signup', signUp);
router.post('/signin', auth, signIn);
/**
 *
 * @function getUsers
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function getUsers(req, res, next){
  users.get()
    .then(records => {
      const output = {
        count: records.length,
        output: records,
      };
      res.status(200).json(output);
    })
    .catch(err => res.status(403).send('could not get users'));
}
/**
 *
 * @function signUp
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function signUp(req, res, next){
  console.log(req.body);
  users.post(req.body)
    .then(result => {
      // console.log(result);
      // let token = users.generateToken(result);
      res.status(200).send(result);
    })
    .catch(err => res.status(403).send('Error creating user'));
}
/**
 *
 * @function signIn
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function signIn(req, res, next){
  res.status(200).send(res.token);
}

module.exports = router;