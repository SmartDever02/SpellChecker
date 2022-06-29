import { memo } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../app/store';
import { SERVER_RUST } from '../../../helper/wrappedAxios';

const ResultPanel = (props: PropsType) => {
  const data = useSelector((state: RootState) => state.editbox.data);
  const results = useSelector((state: RootState) =>
    props.type === SERVER_RUST
      ? state.editbox.rustResult
      : state.editbox.nodeResult
  );

  const makeTooltip = (one: any, index: number) => {
    return !one.suggestions.length
      ? one.correct
        ? 'This word is correct one.'
        : "Can't find this word from the dictionary"
      : 'Originl word is ' +
          data[index] +
          ' and possible suggestion(s) is(are) ' +
          one.suggestions.join(',');
  };

  return (
    <div className='bg-white w-full lg:h-full overflow-auto break-words p-[8px_16px]'>
      {data.length > 0 && (
        <>
          <span className='pl-2 font-bold'>Suggestions:</span>
          <br />
        </>
      )}
      {results.map((one, index) => {
        return (
          !one.correct && (
            <>
              <span
                key={one.best_one + index}
                className={`group relative h-fit mx-2 ${
                  !one.correct && one.suggestions.length == 0
                    ? '!bg-[#f0000083] border-solid !border-b-[#d4000090] border-b-2'
                    : ''
                } ${
                  !one.correct && one.suggestions.length != 0
                    ? 'hover:bg-[#e4ca7450] border-dashed border-b-[#e4b37490] border-b-2 transition-all duration-200 cursor-pointer'
                    : ''
                }
          `}
              >
                {data[index]}
              </span>
              {one.suggestions.length > 0
                ? '(' + one.suggestions.join(',') + ')'
                : '(Failed to find this word from dictionary)'}
            </>
          )
        );
      })}
      {data.length > 0 && (
        <>
          <br />
          <span className='pl-2 font-bold'>Suggested Sentence:</span>
          <br />
        </>
      )}
      {results.map((one, index) => (
        <>
          <span
            onDoubleClick={() => alert(makeTooltip(one, index))}
            key={one.best_one + index + 'sentence'}
            title={makeTooltip(one, index)}
            className={`group relative h-fit ml-2 ${
              !one.correct && one.suggestions.length == 0
                ? '!bg-[#f0000083] border-solid !border-b-[#d4000090] border-b-2 cursor-pointer'
                : ''
            } ${
              !one.correct && one.suggestions.length != 0
                ? 'hover:bg-[#e4ca7450] border-dashed border-b-[#e4b37490] border-b-2 transition-all duration-200 cursor-pointer'
                : ''
            }
          `}
          >
            {one.best_one}
          </span>
        </>
      ))}
    </div>
  );
};

interface PropsType {
  type: String;
}

export default memo(ResultPanel);
