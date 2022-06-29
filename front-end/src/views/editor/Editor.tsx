import Container from '../../components/container/Container';
import EditBox from './components/EditBox';

const Editor = () => {
  return (
    <Container addClass='reltive lg:h-full flex flex-col justify-center py-[40px] lg:py-0  bg-[url("/assets/lightbackground.jpg")] bg-cover bg-opcity-400'>
      <EditBox />
    </Container>
  );
};

export default Editor;
