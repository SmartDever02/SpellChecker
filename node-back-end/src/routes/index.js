const apiRouter = require('./route');
const Router = require('express').Router;
const router = new Router();

router.use('/api', apiRouter);

module.exports = router;
