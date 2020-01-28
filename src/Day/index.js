import React, { useContext } from 'react';
import { PricingContext } from '../Context';
import { FaTimesCircle } from 'react-icons/fa';
import './Day.css';
import Form from './Form';


const CloseButton = ({ k }) => {
  const { removeDay } = useContext(PricingContext);
  return (
    <button type="button" onClick={() => removeDay(k)} className="close text-right" aria-label="Close">
      <span aria-hidden="true" className="text-right"><FaTimesCircle style={{ color: 'red' }} /></span>
    </button>
  )
};

const Wrapper = ({ children }) => (
  <div style={{ border: '1px solid white', padding: '8px', marginBottom: '8px', backgroundColor: 'white', color: '#282c34', borderRadius: '4px' }}>
    {children}
  </div>
);

const DayHeader = ({ children }) => <h3 className="text-left">{children}</h3>;

const ExpenseTable = ({ children }) => (
  <div className="mt-4">
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Item</th>
          <th>Type</th>
          <th>Price</th>
          <th>Shared</th>
          <th>Vat</th>
          <th>CoH</th>
          <th>Remarks</th>
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  </div>
)

const Expense = (props) => {
  const { priceItemClicked } = useContext(PricingContext);
  const { 
    id,
    key,
    item,
    type,
    price,
    remarks,
    shared,
    coh,
    vat } = props.item;
  return (
    <tr onClick={() => priceItemClicked(id, key)}>
      <td>{id.slice(-4,-1)}</td>
      <td>{item}</td>
      <td>{type}</td>
      <td>{`Php ${price}`}</td>
      <td>{shared ? 'True' : 'False'}</td>
      <td>{vat ? 'True' : 'False'}</td>
      <td>{coh ? 'True' : 'False'}</td>
      <td>{remarks}</td>
    </tr>
  )
};

export default (props) => {
  const { Header, key, expenses, dayRef } = props.item;
  return (
    <Wrapper>
      { key > 1 && <CloseButton k={key} /> }
      <DayHeader>{Header}</DayHeader>
      <Form k={key} ref={dayRef} />
      <ExpenseTable>
        {expenses.map((item) => <Expense key={item.id} item={item} />)}
      </ExpenseTable>
    </Wrapper>
  )
}







