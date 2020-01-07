import React, {useState} from 'react';

export const PricingContext = React.createContext();
const initialState = {name:'Tom'}

export const Provider = (props) => {
  const [state, updateState ] = useState(initialState);
  const { children } = props
  return (
    <PricingContext.Provider value={{...state}}>
      {children}
    </PricingContext.Provider>
  )
};

