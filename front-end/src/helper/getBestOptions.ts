/*###
return value: {
  hasOption: if suggestions exist true, or false.
  match: true if there is the same word in suggestions.
  value: return value.
}

###*/

const getBestOptions = (suggestions: Array<any>, word: String) => {
  // if there is no suggestions, return word itself.
  if (suggestions.length === 0) {
    return {
      hasOption: false,
      match: false,
      value: word,
    };
  }

  // if there is the same option as word, return word
  if (
    suggestions.filter((sug: any) => sug === word || sug === word.toLowerCase())
      .length > 0
  )
    return {
      hasOption: true,
      match: true,
      value: word.toLowerCase(),
    };

  // The option that starts with word
  let startWith = suggestions.filter(
    (sug: any) => sug.slice(0, word.length) === word
  );

  if (startWith.length > 0)
    return {
      hasOption: true,
      match: false,
      value: startWith[0],
    };

  // The option that includes the word
  let includes = suggestions.filter((sug: any) => sug.includes(word));
  if (includes.length > 0)
    return {
      hasOption: true,
      match: false,
      value: includes[0],
    };

  // return the first suggestion
  return {
    hasOption: true,
    match: false,
    value: suggestions[0],
  };
};

export default getBestOptions;
