const express = require('./express');
const routes = require('./routes');
const server = express(routes);

server.listen(5000);

module.exports = server;
