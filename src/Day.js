import React, { useContext } from 'react';
import { PricingContext } from './Context';
import { FaTimesCircle } from 'react-icons/fa';


const ItemInput = () => <input type="text" id="item" name="item" placeholder="Item" className="form-control mr-1" />;
const PriceInput = () => <input type="number" step="any" name="price" placeholder="0.0" className="form-control mr-2 text-right" />;
const RemarksInput = () => <input type="text" name="remarks" id="remarks" placeholder="remarks" className="form-control mr-1" />;
const SelectType = () => (
  <select id="type" className="custom-select mr-1">
    <option value="misc">Miscellaneous</option>
    <option value="" defaultValue>Type</option>
    <option value="accommodation">Accommodation</option>
    <option value="transportation">Transportation</option>
    <option value="meals">Meals</option>
    <option value="tourguide">Tourist guide fee</option>
    <option value="entrancefee">Entrance fee</option>
  </select>
);

const SharedCheckBox = () => (
  <div className="form-group mr-2">
    <div className="form-check">
      <input type="checkbox" id="shared" name="shared" className="form-check-input" />
      <label htmlFor="shared" className="form-check-label">Shared</label>
    </div>
  </div>
);

const VatCheckBox = () => (
  <div className="form-group mr-2">
    <div className="form-check">
      <input type="checkbox" id="vat" name="vat" className="form-check-input" />
      <label htmlFor="vat" className="form-check-label">Vat</label>
    </div>
  </div>
);

const CohCheckBox = () => (
  <div className="form-group mr-2">
    <div className="form-check">
      <input type="checkbox" id="coh" name="coh" className="form-check-input" />
      <label htmlFor="coh" className="form-check-label">CoH</label>
    </div>
  </div>
);

const Form = () => {
  return (
    <form className="form-inline" onSubmit={console.log()}>
      <ItemInput />
      <SelectType />
      <PriceInput />
      <SharedCheckBox />
      <VatCheckBox />
      <CohCheckBox />
      <RemarksInput />
      <button type="submit" className="btn btn-success">Add</button>
    </form>
  )
}

const CloseButton = ({ k }) => {
  const { actions } = useContext(PricingContext);
  return (
    <button type="button" onClick={() => actions.removeDay(k)} className="close text-right" aria-label="Close">
      <span aria-hidden="true" className="text-right"><FaTimesCircle style={{ color: 'red' }} /></span>
    </button>
  )
}

const Wrapper = ({ children }) => (
  <div style={{ border: '1px solid white', padding: '8px', marginBottom: '8px', backgroundColor: 'white', color: '#282c34' }}>
    {children}
  </div>
);

const DayHeader = ({ children }) => <h3 className="text-left">{children}</h3>

export default (props) => {
  const { actions } = useContext(PricingContext);
  const { Header, key } = props.item;
  return (
    <Wrapper>
      <CloseButton k={key} />
      <DayHeader>{Header}</DayHeader>
      <Form />
    </Wrapper>
  )
}





