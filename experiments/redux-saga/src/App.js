import React from 'react';
import { Provider } from 'react-redux';

import './styles.css';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <div></div>
    </Provider>
  );
}
