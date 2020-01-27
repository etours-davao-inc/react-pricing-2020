import React, { useContext, useState } from 'react';
import { PricingContext } from './Context';
import './App.css';

import Items from './Items';

const TaxMarkUpForm = () => {
  const { markup, tax, updateTaxMarkUp } = useContext(PricingContext);
  const [state, setState] = useState({markup, tax});

  const onChange = (e) => {
    const newState = {...state, [e.target.name]: e.target.value}
    setState(newState);
    updateTaxMarkUp(newState);
  }

  return (
    <div className="form-inline mb-2">
      <div className="input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">Mark Up %</div>
        </div>
        <input 
          type="number" 
          id="markup" 
          name="markup" 
          onChange={onChange} 
          placeholder="0%" 
          className="form-control mr-1 text-right font-weight-bold"
          value={markup}
        />
      </div>
      <div className="input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">Margin %</div>
        </div>
        <input 
          type="number" 
          id="tax" 
          name="tax" 
          onChange={onChange} 
          placeholder="0%" 
          className="form-control mr-1 text-right font-weight-bold"
          value={tax}
        />
      </div>
    </div>
  )
}

export default () => {
  const { name, total } = useContext(PricingContext);
  return (

      <div className="App">
        <header className="App-header">
          <h1>Hello, {name}</h1>
          <TaxMarkUpForm />
          <Items />
          <p>{JSON.stringify(total)}</p>
        </header>
      </div>

  );
}


