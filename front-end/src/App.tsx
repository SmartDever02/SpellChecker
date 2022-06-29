import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import Layout from './components/layout/layout';
import Landing from './views/landing';
import Editor from './views/editor/Editor';
import Page404 from './views/404';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/editor' element={<Editor />} />
          <Route path='/*' element={<Page404 />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
