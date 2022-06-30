import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import ServerBadge from './ServerBadge';
import ResultPanel from './ResultPanel';
import makeSmoothSentence from '../../../helper/getSmoothSentence';
import { SERVER_NODE, SERVER_RUST } from '../../../helper/wrappedAxios';
import { setWordsOfSentence } from '../../../slices/editboxSlice';

import { description } from '../../../resources/data/description';

const EditBox = () => {
  const dispatch = useDispatch();
  const editRef = useRef(null);

  let sentence: any;

  const breakSentence = (sentence: string) => {
    if (!sentence) return;
    let _words = sentence.replaceAll('\n', ' ').split(' ');
    let words = _words.filter((oneword) => oneword !== '');

    makeSmoothSentence(SERVER_RUST, words, dispatch);
    makeSmoothSentence(SERVER_NODE, words, dispatch);

    dispatch(setWordsOfSentence(words));
  };

  const changeHandler = (e: any) => {
    sentence = e.target.value;
  };

  const enterHandler = (e: any) => {
    let { key } = e;

    if (key === 'Enter') {
      e.preventDefault();
      breakSentence(e.target.value);
    }
  };

  return (
    <div className='w-full bg-[#E7E9EB] rounded-xl px-5 md:px-10 py-6 md:py-10 shadow-md'>
      <h5 className='font-bold text-lg'>Description</h5>
      <p className='description pb-2 max-h-[100px] overflow-auto'>
        {description}
      </p>
      <div className='toolbar'>
        <button
          onClick={() => breakSentence(sentence)}
          className='p-[8px_16px] rounded-md bg-emerald-500 hover:bg-emerald-600 transition-all duration-200 text-white mb-4'
        >
          {'Run »'}
        </button>
      </div>
      <div className='flex flex-col gap-4'>
        <textarea
          ref={editRef}
          className='border-l-4 border-l-emerald-600 bg-dark w-full p-4'
          onChange={changeHandler}
          onKeyDown={enterHandler}
        />
        <div className='w-full flex flex-col md:flex-row gap-4 select-none'>
          <div className='node-result w-full md:w-1/2 min-h-[100px] max-h-[250px] flex'>
            <ServerBadge name='NODE' />
            <ResultPanel type={SERVER_NODE} />
          </div>
          <div className='rust-result w-full md:w-1/2 min-h-[100px] max-h-[250px] flex'>
            <ServerBadge name='RUST' />
            <ResultPanel type={SERVER_RUST} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBox;
