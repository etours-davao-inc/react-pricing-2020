import React, { useState, useRef } from 'react';

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
          price: 200,
          shared: false,
          vat: true,
          coh: true,
          remarks: "",
        }
      ]
    }
  ],
  total: {},
  markup: .30,
  tax: .20,
  commission: 0,
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
        items: [...items, { Header: `Day ${currentDay}`, key: currentDay, expenses: [] } ]})
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
      const total = computeTotal({ ...state});
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
    updateTaxMarkUp({ markup, tax }) {
      updateState({...state, markup, tax});
    },
  };
  const { children } = props
  return (
    <PricingContext.Provider value={{ ...state, ...actions, PriceFormRef }}>
      {children}
    </PricingContext.Provider>
  )
};

const initialSumState =
{
  shared: 0,
  individual: 0,
  vat: 0,
  coh: 0,
  prices: [['cost', 'mark up', 'price before tax', 'price after tax', 'price after commission', 'sales', 'cost of service', 'profit', 'VAT payable', 'IT payable', 'net income']]
}

const computeTotal = ({ items, markup, tax, commission }) => {
  console.log("Items", items)
  const expenses = items.map(item => item.expenses).flat();
  const cos = expenses.reduce((sum, {price}) => sum + price, 0);
  console.log("cos", cos)
  console.log("Expenses", expenses)
  const total = expenses.reduce((sum, { price, shared, vat, coh }) => {
    if (shared) sum['shared'] = sum.shared + price;
    if (!shared) sum['individual'] = sum.individual + price;
    if (vat) sum['vat'] = sum.vat + price;
    if (coh) sum['coh'] = sum.coh + price;
    for (let i = 1; i <= 20; i++) {
      let cost = (sum['shared'] / i + sum['individual']);
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
        cost,
        markUp.toFixed(2),
        priceBeforeTax.toFixed(2), 
        priceAfterTax.toFixed(2),
        priceAfterCommission.toFixed(2),
        sales.toFixed(2),
        cos.toFixed(2),
        profit.toFixed(2),
        vatPayable.toFixed(2),
        itPayable.toFixed(2),
        netIncome.toFixed(2)
      ]
    }
    return sum
  }, initialSumState);
  console.log('computed total', total)
  return total;
}
