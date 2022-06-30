let dictionary;

const getDictionary = () => {
  if (!dictionary) {
    dictionary = require('./data.json').data;
  }
  return dictionary;
};

module.exports = {
  getDictionary,
};
