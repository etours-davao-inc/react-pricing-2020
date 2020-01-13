import React, { useContext } from 'react';
import { PricingContext } from '../Context';
import { FaTimesCircle } from 'react-icons/fa';
import Form from './Form';


const CloseButton = ({ k }) => {
  const { removeDay } = useContext(PricingContext);
  return (
    <button type="button" onClick={() => removeDay(k)} className="close text-right" aria-label="Close">
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
  const { Header, key, expenses } = props.item;
const expenseTable = expenses.map(({ item, price, type }) => <div key={item}>{key} : {item} : {price} --> {type}</div>)
  return (
    <Wrapper>
      <CloseButton k={key} />
      <DayHeader>{Header}</DayHeader>
      <Form k={key} />
      {expenseTable}
    </Wrapper>
  )
}





