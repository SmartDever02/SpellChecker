const express = require('./express');
const routes = require('./routes');
const { appConfig } = require('./config');
const app = express(routes);

app.listen(appConfig.APP_PORT);

module.exports = app;
