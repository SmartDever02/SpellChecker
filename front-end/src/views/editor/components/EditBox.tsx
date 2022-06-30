import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import ServerBadge from './ServerBadge';
import ResultPanel from './ResultPanel';
import makeSmoothSentence from '../../../helper/getSmoothSentence';
import { SERVER_NODE, SERVER_RUST } from '../../../helper/wrappedAxios';
import { setAllEmpty, setWordsOfSentence } from '../../../slices/editboxSlice';

import Description from './Description';

const EditBox = () => {
  const dispatch = useDispatch();
  const editRef = useRef(null);

  let sentence: any;

  const breakSentence = (sentence: string) => {
    if (!sentence) return;

    let _words = sentence.split(' ');
    let words = _words.filter((oneword) => oneword !== '');

    makeSmoothSentence(SERVER_NODE, words, dispatch);
    makeSmoothSentence(SERVER_RUST, words, dispatch);

    dispatch(setWordsOfSentence(words));
  };

  const changeHandler = (e: any) => {
    sentence = e.target.value;
  };

  const enterHandler = (e: any) => {
    let { key } = e;

    if (key === 'Enter') {
      e.preventDefault();

      if (sentence == '') {
        dispatch(setAllEmpty());
      }

      breakSentence(e.target.value);
    }
  };

  return (
    <div className='w-full bg-[#E7E9EB] rounded-xl px-5 md:px-10 py-6 md:py-10 shadow-lg'>
      <Description />
      <button
        onClick={() => breakSentence(sentence)}
        className='p-[8px_16px] rounded-md bg-emerald-500 hover:bg-emerald-600 transition-all duration-200 text-white mb-4'
      >
        {'Run »'}
      </button>
      <div className='flex flex-col gap-4'>
        <textarea
          ref={editRef}
          className='border-l-4 border-l-emerald-600 bg-dark w-full p-4'
          onChange={changeHandler}
          onKeyDown={enterHandler}
          placeholder='Example sentences: yo loks clever, cn yo blieve me, onc more plese'
        />
        <div className='w-full flex flex-col md:flex-row gap-[2%] select-none'>
          <div className='node-result w-full md:w-[49%] min-h-[100px] max-h-[250px] flex'>
            <ServerBadge name='NODE' />
            <ResultPanel type={SERVER_NODE} />
          </div>
          <div className='rust-result mt-[15px] md:mt-0 w-full md:w-[49%] min-h-[150px] max-h-[250px] flex'>
            <ServerBadge name='RUST' />
            <ResultPanel type={SERVER_RUST} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBox;
