const Router = require('express').Router;
const router = new Router();

const { apiController } = require('../controllers');

router.get('/spellcheck/:word', apiController.getSpellCheck);

module.exports = router;
