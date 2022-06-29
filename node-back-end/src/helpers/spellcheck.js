const checkCase = (word) => {
  if (word == word.toUpperCase() || word == word.toLowerCase()) {
    return true;
  }
  let firstletter = word[0];
  if (firstletter != firstletter.toUpperCase()) {
    return false;
  }
  let rest = word.slice(1, word.length);
  return rest == rest.toLowerCase();
};

//Dynamic Programming LCS => Longest Common Subsequence
// complexity O(Square(n))

const spellCheck = (word) => {
  let origin = word;
  const dictionary = require('./data.json').data;
  let input = word; // bllllLLlln, car, caR, man
  let suggestions = [];
  let distance = [];
  let correct = false;

  // apple => aple
  const compress = (str) => {
    let ret = '';
    for (let i = 0; i < str.length; i++) {
      if (!i || str[i] != str[i - 1]) ret += str[i];
    }
    return ret;
  };

  input = compress(input.toLowerCase());

  const isVowel = (c) => {
    const vowels = ['a', 'i', 'u', 'o', 'e'];
    return vowels.includes(c);
  };

  for (let item of dictionary) {
    if (checkCase(origin) && origin.toLowerCase() == item.toLowerCase()) {
      correct = true;
      break;
    }

    word = compress(item.toLowerCase());

    const N = input.length;
    const M = word.length;

    let dp = Array(N + 1);

    for (let i = 0; i <= N; i++) {
      dp[i] = [];
      for (let j = 0; j <= M; j++) {
        dp[i][j] = 0;
        if (i + j && (!i || !j)) dp[i][j] = -1e5;
      }
    }
    for (let i = 1; i <= N; i++)
      for (let j = 1; j <= M; j++) {
        dp[i][j] = -1e5;
        // if (isVowel(input[i - 1])) dp[i][j] = dp[i - 1][j];
        if (isVowel(word[j - 1])) dp[i][j] = Math.max(dp[i][j], dp[i][j - 1]);
        if (input[i - 1] == word[j - 1])
          dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - 1] + 1);
      }
    if (word.length + input.length - dp[N][M] * 2 < 2) {
      distance.push(word.length - dp[N][M]);
      suggestions.push(item);
    }
  }
  if (correct) {
    return {
      suggestions: [],
      distance: 0,
      correct: true,
    };
  }

  return {
    suggestions,
    distance,
    correct,
  };
};
module.exports = spellCheck;
