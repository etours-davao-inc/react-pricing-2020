import React, { useState, useRef } from 'react';

export const PricingContext = React.createContext();

const initialSumState =
{
  shared: 0,
  individual: 0,
  vat: 0,
  coh: 0,
  prices: [['pax', 'cost', 'mark up', 'price before tax', 'price after tax', 'price after commission', 'sales', 'cost of service', 'profit', 'VAT payable', 'IT payable', 'net income']]
}

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
          price: 200,
          shared: false,
          vat: true,
          coh: true,
          remarks: "",
        }
      ]
    }
  ],
  total: initialSumState,
  markup: .30,
  tax: .20,
  commission: 0.07,
  min: 1,
  max: 10,
}

export const Provider = (props) => {
  const [state, updateState] = useState(initialState);
  const [days, updateDays] = useState(1)
  const PriceFormRef = useRef(null);

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
      updateState(state => ({
        ...state,
        items: [...items, { Header: `Day ${currentDay}`, key: currentDay, expenses: [] }]
      })
      )
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
      if (data.price === 0 || data.price < 0) return;
      const items = [...state.items];
      const index = items.findIndex(({ key }) => key === data.key)
      let expenses = [...items[index].expenses];
      if (expenses.find(expense => expense.item === data.item)) return
      expenses = [...expenses, data];
      items[index].expenses = expenses;
      const total = computeTotal({ ...state });
      updateState({ ...state, total })
    },
    priceItemClicked(id, k) {
      console.log('Clicked price item', k, id);
      const items = [...state.items,];
      const index = items.findIndex(({ key }) => key === k)
      let expense = [...items[index].expenses].find(expense => expense.id === id);
      PriceFormRef.current.setFormState(expense)
    },
    updatePriceItem(expense) {
      console.log('Update Price Item', expense)
      if (expense.item === "") return;
      if (expense.price === 0 || expense.price < 0) return;
      const items = [...state.items,];
      const index = items.findIndex(({ key }) => key === expense.key)
      let expenses = [...items[index].expenses];
      const itemIndex = expenses.findIndex(exp => exp.id === expense.id);
      // if (expenses.find(exp => exp.item === expense.item)) return
      items[index].expenses[itemIndex] = expense;
      updateState({ ...state, items })
    },
    updateTaxMarkUp({ markup, tax, min, max, commission }) {
      updateState({ ...state, markup, tax, min, max, commission });
    },
  };
  const { children } = props
  return (
    <PricingContext.Provider value={{ ...state, ...actions, PriceFormRef }}>
      {children}
    </PricingContext.Provider>
  )
};

const computeTotal = ({ min, max, items, markup, tax, commission }) => {
  console.log("Items", items)
  const expenses = items.map(item => item.expenses).flat();
  const numToString = (num) => (num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  const total = expenses.reduce((sum, { price, shared, vat, coh }) => {
    if (shared) sum['shared'] = sum.shared + price;
    if (!shared) sum['individual'] = sum.individual + price;
    if (vat) sum['vat'] = sum.vat + price;
    if (coh) sum['coh'] = sum.coh + price;
    for (let i = min; i <= max; i++) {
      let cost = (sum['shared'] / i + sum['individual']);
      let cos = cost * i;
      let markUp = cost * markup;
      let priceBeforeTax = cost + markUp;
      let priceAfterTax = priceBeforeTax + (tax * priceBeforeTax);
      let commissionRate = commission * priceAfterTax;
      let priceAfterCommission = priceAfterTax - commissionRate;
      let sales = priceAfterCommission * i;
      let profit = sales - cos;
      let vatPayable = 0;
      let itPayable = 0;
      let netIncome = 0;
      sum['prices'][i] = [
        i,
        numToString(cost),
        numToString(markUp),
        numToString(priceBeforeTax),
        numToString(priceAfterTax),
        numToString(priceAfterCommission),
        numToString(sales),
        numToString(cos),
        numToString(profit),
        numToString(vatPayable),
        numToString(itPayable),
        numToString(netIncome)
      ]
    }
    return sum
  }, initialSumState);
  console.log('computed total', total)
  return total;
}
