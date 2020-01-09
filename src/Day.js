import React, { useContext } from 'react';
import { PricingContext } from './Context';

export default (props) => {
  const { actions } = useContext(PricingContext);
  const { Header, key } = props.item;
  return (
    <div style={{border:'1px solid white', padding:'8px', marginBottom:'8px'}}>
      <p>{Header}</p>
      <form>
        <input type="text" id="item" name="item" placeholder="Item" />
        <select id="type">
          <option value="misc">Miscellaneous</option>
          <option value="" defaultValue>Type</option>
          <option value="accommodation">Accommodation</option>
          <option value="transportation">Transportation</option>
          <option value="meals">Meals</option>
          <option value="tourguide">Tourist guide fee</option>
          <option value="entrancefee">Entrance fee</option>
        </select>
        <input type="number" step="any" name="price" placeholder="0.0" />
        <label htmlFor="shared">Shared</label>
        <input type="checkbox" id="shared" name="shared" />
        <label htmlFor="vat">Vat</label>
        <input type="checkbox" id="vat" name="vat" />
        <label htmlFor="coh">CoH</label>
        <input type="checkbox" id="coh" name="coh" />
        <input type="text" name="remarks" id="remarks" placeholder="remarks" />
      </form>
      <button onClick={() => actions.removeDay(key)}>Delete</button>
    </div>
  )
}