import React, {useState} from 'react';

export const PricingContext = React.createContext();

const initialState = {
  name:'Tom',
  items: []
}

export const Provider = (props) => {
  const [state, updateState ] = useState(initialState);
  const [days, updateDays] = useState(0)

  const refreshItems = (items) => {
    items.forEach((item, i) => {
      const day = i + 1
      item.Header = `Day ${day}`
      item.key = day
      console.log(day)
    });
  }

  const actions = {
    addNewDay() {
      console.log("Add new day passed to context")
      const { items } = state;
      const currentDay = days + 1
      updateDays(currentDay);
      items.push({Header: `Day ${currentDay}`, key: currentDay})
      updateState({...state, items })
    },
    removeDay(key) {
      console.log(`Remove day ${key}`);
      const { items } = state;
      const filteredItems = items.filter((item) => item.key !== key);
      updateDays(filteredItems.length)
      refreshItems(filteredItems) // Refresh items
      updateState({...state, items:filteredItems}) // remove
    }
  };
  const { children } = props
  return (
    <PricingContext.Provider value={{...state, actions}}>
      {children}
    </PricingContext.Provider>
  )
};

