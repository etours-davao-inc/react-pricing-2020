import React,  {useContext} from 'react';
import { PricingContext } from './Context';

import Day from './Day';

export default () => {
  const { items, addNewDay } = useContext(PricingContext);

  return (
    <>
      {items.map((item) => <Day key={item.key} item={item} />)}
      <button onClick={() => addNewDay()}>Add Day</button>
    </>
  )
}
