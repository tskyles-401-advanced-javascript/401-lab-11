'use strict';

require('dotenv').config('../.env');

const express = require('express');

const errorHandler = require('../lib/middleware/500');
const notFoundHandler = require('../lib/middleware/404');

const apiRouter = require('../lib/routes/routes');
const app = express();

app.use(express.json());

app.use('/docs', express.static('docs'));
app.get('/', (req, res, next) => {
  res.json('Welcome!');
});
app.use(apiRouter);
app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  },
};
