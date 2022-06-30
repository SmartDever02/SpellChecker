const spellCheck = require('../helpers/spellcheck');

exports.getSpellCheck = (req, res) => {
  const result = spellCheck(req.params.word);
  res.status(200).send({ ...result });
};
