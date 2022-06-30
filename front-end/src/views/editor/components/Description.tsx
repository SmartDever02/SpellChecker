import { description } from '../../../resources/data/description';

const Description = () => {
  return (
    <>
      <h5 className='font-bold text-lg'>Description</h5>
      <p className='description pb-2 max-h-[100px] overflow-auto'>
        {description}
      </p>
    </>
  );
};

export default Description;
