import React, { useContext, useState } from 'react';
import { PricingContext } from '../Context';


export default ({ k }) => {
  const initialState = { key: k, item: "", type: "", price: "", shared: false, vat: false, coh: false, remarks: "" }
  const { priceItemSubmit } = useContext(PricingContext);
  const [state, setState] = useState(initialState);
  const onChange = (e) => {
    console.log(e.target.name, e.target.value)
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setState({ ...state, [name]: value })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    priceItemSubmit(state)
  }
  return (
    <form className="form-inline" onSubmit={onSubmit}>
      <input type="text" name="item" placeholder="Item" className="form-control mr-1" onChange={onChange} />
      <select className="custom-select mr-1" name="type" onChange={onChange} value={state.type} >
        <option value="misc">Miscellaneous</option>
        <option value="accommodation">Accommodation</option>
        <option value="transportation">Transportation</option>
        <option value="meals">Meals</option>
        <option value="tourguide">Tourist guide fee</option>
        <option value="entrancefee">Entrance fee</option>
      </select>
      <input 
        type="number" 
        step="any" 
        name="price" 
        placeholder="0.0" 
        className="form-control mr-2 text-right" 
        onChange={onChange} 
      />
      <div className="form-group mr-2">
        <div className="form-check">
          <input 
            type="checkbox" 
            id="shared" 
            name="shared" 
            className="form-check-input" 
            checked={state.shared} 
            onChange={onChange} 
          />
          <label htmlFor="shared" className="form-check-label">Shared</label>
        </div>
      </div>
      <div className="form-group mr-2">
        <div className="form-check">
          <input 
            type="checkbox" 
            id="vat" 
            name="vat" 
            className="form-check-input" 
            checked={state.vat} 
            onChange={onChange} 
          />
          <label htmlFor="vat" className="form-check-label">Vat</label>
        </div>
      </div>
      <div className="form-group mr-2">
        <div className="form-check">
          <input 
            type="checkbox" 
            id="coh" 
            name="coh" 
            className="form-check-input" 
            checked={state.coh} 
            onChange={onChange} 
          />
          <label htmlFor="coh" className="form-check-label">CoH</label>
        </div>
      </div>
      <input type="text" name="remarks" placeholder="remarks" className="form-control mr-1" onChange={onChange} />
      <button type="submit" className="btn btn-success">Add</button>
    </form>
  )
};
