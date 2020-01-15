import React, { useContext, useState } from 'react';
import { PricingContext } from '../Context';


export default ({ k }) => {
  const defaultState = { key: k, item: "", type: "miscellaneous", price: "", shared: false, vat: false, coh: false, remarks: "" };
  const { priceItemSubmit } = useContext(PricingContext);
  const [state, setState] = useState(defaultState);
  const onChange = (e) => {
    console.log(e.target.name, e.target.value)
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setState({ ...state, [name]: value })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    priceItemSubmit({
      ...state,
      id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    });
    setState(defaultState)
  }

  return (
    <form className="form-inline" onSubmit={(e) => onSubmit(e)}>
      <input type="text" name="item" placeholder="Item" className="form-control mr-1" onChange={onChange} value={state.item} />
      <select className="custom-select mr-1" name="type" onChange={onChange} value={state.type} >
        <option value="miscellaneous" defaultValue>Miscellaneous</option>
        <option value="accommodation">Accommodation</option>
        <option value="transportation">Transportation</option>
        <option value="meals">Meals</option>
        <option value="tourguide">Tourist guide fee</option>
        <option value="entrance fee">Entrance fee</option>
      </select>
      <input
        type="number"
        step="any"
        name="price"
        placeholder="0.0"
        className="form-control mr-2 text-right"
        onChange={onChange}
        value={state.price}
      />
      <div className="form-group mr-2">
        <div className="form-check">
          <input
            type="checkbox"
            id={`shared-${state.key}`}
            name="shared"
            className="form-check-input"
            checked={state.shared}
            onChange={onChange}

          />
          <label htmlFor={`shared-${state.key}`} className="form-check-label">Shared</label>
        </div>
      </div>
      <div className="form-group mr-2">
        <div className="form-check">
          <input
            type="checkbox"
            id={`vat-${state.key}`}
            name="vat"
            className="form-check-input"
            checked={state.vat}
            onChange={onChange}
          />
          <label htmlFor={`vat-${state.key}`} className="form-check-label">Vat</label>
        </div>
      </div>
      <div className="form-group mr-2">
        <div className="form-check">
          <input
            type="checkbox"
            id={`coh-${state.key}`}
            name="coh"
            className="form-check-input"
            checked={state.coh}
            onChange={onChange}
          />
          <label htmlFor={`coh-${state.key}`} className="form-check-label">CoH</label>
        </div>
      </div>
      <input type="text" name="remarks" placeholder="remarks" className="form-control mr-1" onChange={onChange} />
      <button type="submit" className="btn btn-success">Add</button>
    </form>
  )
};
