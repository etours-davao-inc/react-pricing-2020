import React, { useContext } from 'react';
import { PricingContext } from './Context';

export default (props) => {
  const { actions } = useContext(PricingContext);
  const { Header, key } = props.item;
  return (
    <p>{Header} <button onClick={() => actions.removeDay(key)}>Delete</button></p>
  )
}