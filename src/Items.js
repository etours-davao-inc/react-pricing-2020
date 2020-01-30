import React, { useContext } from 'react';
import { PricingContext } from './Context';

import Day from './Day';

export default () => {
  const { expenses, days, addNewDay } = useContext(PricingContext);
  console.log(expenses)
  const DayComponent = []
  for (let day = 1; day <= days; day++) {
    DayComponent.push(<Day key={day} day={day} />)
  }

  return (
    <>
      {/* {expenses.map((item) => <Day key={item.key} item={item} />)} */}
      {DayComponent}
      <button
        onClick={() => addNewDay()}
        className="btn btn-success"
      >
        Add Day
      </button>
    </>
  )
}
