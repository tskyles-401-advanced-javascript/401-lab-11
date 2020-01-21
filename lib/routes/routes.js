'use strict';

const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const users = require('../models/users-model');

app.get('/', (req, res, next) => {
  res.json('Welcome!');
});
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));
router.get('/users', getUsers);
router.post('/signup' );
router.post('/signin' );
/**
 *
 * @function getUsers
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function getUsers(req, res, next){
  res.status(200).send(users.list);
}
/**
 *
 * @function signUp
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function signUp(req, res, next){

}
/**
 *
 * @function signIn
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function signIn(req, res, next){

}