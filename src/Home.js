import React, { useContext, useState } from 'react';
import { PricingContext } from './Context';
import './App.css';

import Items from './Items';

const TaxMarkUpForm = () => {
  const { markup, tax, min, max, commission, updateTaxMarkUp } = useContext(PricingContext);
  const [state, setState] = useState({ markup, tax, min, max, commission });

  const onChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (['markup', 'tax', 'commission'].includes(name)) value = value/100;
    const newState = { ...state, [name]: value }
    setState(newState);
    updateTaxMarkUp(newState);
  }

  return (
    <div className="form-inline mb-2">
      <div className="input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">Min</div>
        </div>
        <input
          type="number"
          id="min"
          name="min"
          onChange={onChange}
          placeholder="0"
          className="form-control mr-1 text-right font-weight-bold"
          value={min}
        />
      </div>
      <div className="input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">Max</div>
        </div>
        <input
          type="number"
          id="max"
          name="max"
          onChange={onChange}
          placeholder="0"
          className="form-control mr-1 text-right font-weight-bold"
          value={max}
        />
      </div>
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
          value={`${(markup*100).toFixed(1)}`}
        />
      </div>
      <div className="input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">Tax %</div>
        </div>
        <input
          type="number"
          id="tax"
          name="tax"
          onChange={onChange}
          placeholder="0%"
          className="form-control mr-1 text-right font-weight-bold"
          value={`${(tax*100).toFixed(1)}`}
        />
      </div>
      <div className="input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">Commission %</div>
        </div>
        <input
          type="number"
          id="commission"
          name="commission"
          onChange={onChange}
          placeholder="0"
          className="form-control mr-1 text-right font-weight-bold"
          value={`${(commission*100).toFixed(1)}`}
        />
      </div>
    </div>
  )
}

export default () => {
  const { name } = useContext(PricingContext);
  return (

    <div className="App">
      <header className="App-header">
        <h1>Hello, {name}</h1>
        <TaxMarkUpForm />
        <Items />
        <Table />
      </header>
    </div>

  );
}

export const Table = () => {
  const { total } = useContext(PricingContext);
  return (
    <table>
      <thead>
        <tr>
          {total.prices[0].map((elem, index) => {
            return (
              <td key={index}>{elem}</td>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {total.prices.map((elem, index) => {
          if (index > 0) {
            return (
              <tr key={index}>
                {elem.map((e,i) => <td key={i}>{e}</td>)}
              </tr>
            )
          }
        })}
      </tbody>
    </table>
  )
}


