const dotenv = require('dotenv').config().parsed;

module.exports = {
  ...dotenv,
  APP_PORT: 5000,
  logging: true,
};
