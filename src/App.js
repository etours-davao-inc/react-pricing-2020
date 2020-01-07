import React from 'react';
import { Provider} from './Context';
import Home from './Home';
import './App.css';

function App() {
  return (
    <Provider>
      <Home />
    </Provider>
  );
}

export default App;
