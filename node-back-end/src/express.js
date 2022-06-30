const express = require('express');
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');

module.exports = function expressWrap(routes) {
  const app = express();

  app.use(cors());
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(routes);

  return app;
};
