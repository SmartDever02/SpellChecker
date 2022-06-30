const Router = require('express').Router;
const router = new Router();

const { controller } = require('../controllers');

router.get('/spellcheck/:word', controller.getSpellCheck);

module.exports = router;
