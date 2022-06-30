import { SERVER_NODE } from './wrappedAxios';
import getBestOptions from './getBestOptions';
import { setNodeResults, setRustResults } from '../slices/editboxSlice';
import serverData from './serverData';

const makeSmoothSentence = async (
  serverType: string,
  words: Array<string>,
  dispatch: Function
) => {
  let results = await Promise.all(
    words.map(async (word) => {
      let res = await serverData(serverType, word);
      let bestOption = getBestOptions(res.suggestions, word);

      return {
        best_one: bestOption,
        suggestions: res.suggestions,
        correct: res.correct,
      };
    })
  );
  dispatch(
    serverType === SERVER_NODE
      ? setNodeResults(results)
      : setRustResults(results)
  );
};

export default makeSmoothSentence;
