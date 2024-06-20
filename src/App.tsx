import React from 'react';
import { Provider } from 'react-redux';
import { store } from './utils/store';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
