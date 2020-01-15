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
          id: 'cb5w83n8zgkzibxhxczts',
          key: 1,
          item: "Crocodile Park",
          type: "entrance fee",
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
      updateDays(filteredItems.length);
      refreshItems(filteredItems)
      updateState({ ...state, items: filteredItems });
    },
    priceItemSubmit(data) {
      console.log('Submitted', data);
      if (data.item === "") return;
      if (data.price == 0 || data.price < 0) return;
      const items = [...state.items,];
      const index = items.findIndex(({ key }) => key === data.key)
      let expenses = [...items[index].expenses];
      if (expenses.find(expense => expense.item === data.item)) return
      expenses = [...expenses, data];
      items[index].expenses = expenses;
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

