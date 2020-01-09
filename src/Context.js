import React, {useState} from 'react';

export const PricingContext = React.createContext();

const initialState = {
  name:'Tom',
  items: []
}

const day = {
  Header: '',
  key: '',
}

export const Provider = (props) => {
  const [state, updateState ] = useState(initialState);
  const [days, updateDays] = useState(0)
  const actions = {
    addNewDay() {
      console.log("Add new day passed to context")
      const items = state.items;
      const currentDay = days + 1
      updateDays(currentDay);
      items.push({Header: `Day ${currentDay}`, key: currentDay})
      updateState({...state, items })
    }
  };
  const { children } = props
  return (
    <PricingContext.Provider value={{...state, actions}}>
      {children}
    </PricingContext.Provider>
  )
};

