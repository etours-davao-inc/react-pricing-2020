import React from 'react';

export const PricingContext = React.createContext();

export const Provider = (props) => {
  const {state, updateState } = React.useState();
  const { children } = props
  return (
    <PricingContext.Provider value={{...state}}>
      {children}
    </PricingContext.Provider>
  )
};

