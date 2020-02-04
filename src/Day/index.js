import React, { useContext, useState } from 'react';
import { PricingContext } from '../Context';
import { FaTimesCircle, FaCheckCircle } from 'react-icons/fa';
import './Day.css';
import './Form.css';
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

const Expense = ({item}) => {
  console.log('Context state', item)
  const { deleteItem, updatePriceItem } = useContext(PricingContext);
  const [ state, setState ] = useState(item)
  console.log('internal state', state)
  const onChange = (e) => {
    // console.log(e.target.name, e.target.value)
    const { name, type } = e.target;
    let { value } = e.target;
    value = type === 'checkbox' ? e.target.checked : value;
    if (type === 'number') value = Number(value);
    const newState = { ...state, [name]: value }
    if (type === 'checkbox' || type === 'select') updatePriceItem(newState);
    setState(newState)
  }

  const update = () => {
    if (state.item === "" || state.price === 0 || state.price < 0) {
      setState(item);
      return
    }
    updatePriceItem(state)
  }

  return (
    <tr>
      <td><input type="text" name="item" value={state.item} className="form-input" onChange={onChange} onBlur={update} /></td>
      <td>
        <select className="custom-select mr-1" name="type" value={state.type} onChange={onChange}>
          <option value="miscellaneous" defaultValue>Miscellaneous</option>
          <option value="accommodation">Accommodation</option>
          <option value="transportation">Transportation</option>
          <option value="meals">Meals</option>
          <option value="tourguide">Tourist guide fee</option>
          <option value="entrance fee">Entrance fee</option>
        </select>
      </td>
      <td><input type="number" name="price" className="text-right" value={state.price} onChange={onChange} onBlur={update} /></td>
      <td>
        <input
          type="checkbox"
          id='shared'
          name="shared"
          className="form-input"
          checked={state.shared}
          onChange={onChange}
        />
      </td>
      <td>
        <input
          type="checkbox"
          id='vat'
          name="vat"
          className="form-input"
          checked={state.vat}
          onChange={onChange}
        />
      </td>
      <td>
        <input
          type="checkbox"
          id='coh'
          name="coh"
          className="form-input"
          checked={state.coh}
          onChange={onChange}
        />
      </td>
      <td>
        <input 
          type="text" 
          name="remarks" p
          laceholder="remarks" 
          className="form-input" 
          value={state.remarks} 
          onChange={onChange} 
          onBlur={update} 
        />
      </td>
      <td><FaTimesCircle style={{ color: 'red', fontSize: '1.5em' }} onClick={() => deleteItem(state.id)} /></td>
    </tr>
  )
};

const NewExpense = ({day}) => {
  const NewItem = {
    id: null,
    day: day,
    item: "", 
    type: "miscellaneous", 
    price: "", 
    shared: false, 
    vat: false, 
    coh: false, 
    remarks: ""   
  }
  const { priceItemSubmit } = useContext(PricingContext);
  const [ state, setState ] = useState(NewItem)
  console.log('internal state', state)
  const onChange = (e) => {
    // console.log(e.target.name, e.target.value)
    const { name, type } = e.target;
    let { value } = e.target;
    value = type === 'checkbox' ? e.target.checked : value;
    if (type === 'number') value = Number(value);
    const newState = { ...state, [name]: value }
    setState(newState)
  }

  const onSubmit= () => {
    if (state.item === "" || state.price === 0 || state.price < 0) return;
    state.id = Math.random().toString(36).substring(2, 6);
    setState(NewItem);
    priceItemSubmit(state)
  }

  return (
    <tr>
      <td><input type="text" name="item" value={state.item} className="form-input" onChange={onChange}  /></td>
      <td>
        <select className="custom-select mr-1" name="type" value={state.type} onChange={onChange}>
          <option value="miscellaneous" defaultValue>Miscellaneous</option>
          <option value="accommodation">Accommodation</option>
          <option value="transportation">Transportation</option>
          <option value="meals">Meals</option>
          <option value="tourguide">Tourist guide fee</option>
          <option value="entrance fee">Entrance fee</option>
        </select>
      </td>
      <td><input type="number" name="price" className="text-right" value={state.price} onChange={onChange}  /></td>
      <td>
        <input
          type="checkbox"
          id='shared'
          name="shared"
          className="form-input"
          checked={state.shared}
          onChange={onChange}
        />
      </td>
      <td>
        <input
          type="checkbox"
          id='vat'
          name="vat"
          className="form-input"
          checked={state.vat}
          onChange={onChange}
        />
      </td>
      <td>
        <input
          type="checkbox"
          id='coh'
          name="coh"
          className="form-input"
          checked={state.coh}
          onChange={onChange}
        />
      </td>
      <td>
        <input 
          type="text" 
          name="remarks"
          laceholder="remarks" 
          className="form-input" 
          value={state.remarks} 
          onChange={onChange} 
           
        />
      </td>
      <td><FaCheckCircle style={{ color: 'green', fontSize: '1.5em' }} onClick={() => onSubmit()} /></td>
    </tr>
  )  
}

export default (props) => {
  const { expenses } = useContext(PricingContext);
  const { day } = props;
  const todaysExpenses = expenses.filter(expense => expense.day === day);

  return (
    <Wrapper>
      {day > 1 && <CloseButton k={day} />}
      <DayHeader>{`Day ${day}`}</DayHeader>
        <ExpenseTable>
          { todaysExpenses.length > 0 && todaysExpenses.map(item => <Expense key={item.id} item={item} />)}
          <NewExpense day={day} />
        </ExpenseTable>
    </Wrapper>
  )
}







