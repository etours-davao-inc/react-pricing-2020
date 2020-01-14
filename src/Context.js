import React, { useState } from 'react';

export const PricingContext = React.createContext();

const initialState = {
  name: 'Tom',
  items: [
    {
      Header: "Day 1",
      key: 1,
      expenses: [
        {
          id: '9r0ts8d8c8d36tbb0qbqw2',
          key: 1,
          item: "Crocodile Park",
          type: "entrancefee",
          price: "200",
          shared: false,
          vat: true,
          coh: true,
          remarks: "",
        }
      ]
    }
  ],
}

export const Provider = (props) => {
  const [state, updateState] = useState(initialState);
  const [days, updateDays] = useState(1)

  const refreshItems = (items) => {
    items.forEach((item, i) => {
      const day = i + 1
      item.Header = `Day ${day}`
      item.key = day
      item.expenses.forEach(expense => expense.key = day)
      console.log(day)
    });
  }

  const actions = {
    addNewDay() {
      console.log("Add new day passed to context")
      const { items } = state;
      const currentDay = days + 1
      updateDays(currentDay);
      items.push({ Header: `Day ${currentDay}`, key: currentDay, expenses: [] })
      updateState({ ...state, items })
    },
    removeDay(key) {
      console.log(`Remove day ${key}`);
      const { items } = state;
      const filteredItems = items.filter((item) => item.key !== key);
      updateDays(filteredItems.length)
      refreshItems(filteredItems) // Refresh items
      updateState({ ...state, items: filteredItems }) // remove
    },
    priceItemSubmit(data) {
      console.log(state.items)
      console.log('Submitted',data.id);
      const items = state.items;
      const index = items.findIndex(({ key }) => {
        return key === data.key;
      })
      items[index].expenses.push(data);
      console.log('New item', items[index])
      updateState({ ...state, items })
    }
  };
  const { children } = props
  return (
    <PricingContext.Provider value={{ ...state, ...actions }}>
      {children}
    </PricingContext.Provider>
  )
};

