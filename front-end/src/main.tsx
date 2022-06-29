import ReactDOM from 'react-dom/client';

import { store } from './app/store';
import { Provider } from 'react-redux';

import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // In development mode, in React 18, useEffect gets triggered twice.
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
