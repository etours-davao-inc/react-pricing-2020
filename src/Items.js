import React,  {useContext} from 'react';
import { PricingContext } from './Context';

export default () => {
  const { items, actions } = useContext(PricingContext);

  const handleClick = () => {
    console.log('Add new day clicked');
    actions.addNewDay();
  }

  return (
    <>
      {items.map((item) => <p key={item.key}>{item.Header}</p>)}
      <button onClick={handleClick}>Add Day</button>
    </>
  )
}
