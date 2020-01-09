import React,  {useContext} from 'react';
import { PricingContext } from './Context';

import Day from './Day';

export default () => {
  const { items, actions } = useContext(PricingContext);

  const handleClick = () => {
    console.log('Add new day clicked');
    actions.addNewDay();
  }

  return (
    <>
      {items.map((item) => <Day key={item.key} item={item} />)}
      <button onClick={handleClick}>Add Day</button>
    </>
  )
}
