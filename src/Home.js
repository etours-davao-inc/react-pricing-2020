import React, { useContext } from 'react';
import { Provider, PricingContext } from './Context';
import './App.css';

import Items from './Items';

export default () => {
  const { name } = useContext(PricingContext);
  console.log(name)
  return (
    <Provider>
      <div className="App">
        <header className="App-header">
          <h1>Hello, {name}</h1>
          <Items />
        </header>
      </div>
    </Provider>
  );
}


