import React, { useContext, useRef } from 'react';
import { PricingContext } from '../Context';
import { FaTimesCircle, FaEdit } from 'react-icons/fa';
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
          <th colSpan={2}></th>
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  </div>
)

const Expense = (props) => {
  const { deleteItem } = useContext(PricingContext);
  const { 
    id,
    day,
    item,
    type,
    price,
    remarks,
    shared,
    coh,
    vat } = props.item;
  const { onClick } = props;  
  return (
    <tr>
      <td>{id.slice(-4,-1)}</td>
      <td>{item}</td>
      <td>{type}</td>
      <td>{`Php ${price}`}</td>
      <td>{shared && 'Shared'}</td>
      <td>{vat && 'Vat'}</td>
      <td>{coh && 'CoH'}</td>
      <td>{remarks}</td>
      <td><FaEdit style={{ color: 'green', fontSize:'1.5em' }} onClick={() => onClick()} /></td>
      <td><FaTimesCircle style={{ color: 'red', fontSize:'1.5em' }} onClick={() => deleteItem(id)} /></td>
    </tr>
  )
};

export default (props) => {
  const formRef = useRef(null);
  const { expenses } = useContext(PricingContext);
  const { day } = props;
  const todaysExpenses = expenses.filter(expense => expense.day === day)

  const onClick = (item) => {
    console.log('Clicked price item', item);
    formRef.current.setFormState(item)
  }

  return (
    <Wrapper>
      { day > 1 && <CloseButton k={day} /> }
      <DayHeader>{`Day ${day}`}</DayHeader>
      <Form k={day} ref={formRef} />
      {todaysExpenses.length > 0 &&
        <ExpenseTable>
          {todaysExpenses.map(item => <Expense key={item.id} item={item} onClick={() => onClick(item)} />)}
        </ExpenseTable>
      }
    </Wrapper>
  )
}







