import React, { useState, createRef } from 'react';

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
  total: {
    shared: 0,
    individual: 0,
    vatShared: 0,
    vatIndividual: 0,
    coh: 0,
    prices: [['pax', 'cost', 'mark up', 'price before tax', 'price after tax', 'price after commission', 'sales', 'cost of service', 'profit', 'VAT payable', 'IT payable', 'net income']]
  },
  markup: .30,
  tax: .20,
  commission: 0.07,
  min: 1,
  max: 10,
}

export const Provider = (props) => {
  initialState.items[0]['dayRef'] = createRef();
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
      updateState(state => ({
        ...state,
        items: [...items, { Header: `Day ${currentDay}`, key: currentDay, expenses: [], dayRef:createRef() }]
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
      items[index].dayRef.current.setFormState(expense)
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
    <PricingContext.Provider value={{ ...state, ...actions }}>
      {children}
    </PricingContext.Provider>
  )
};

const reducedItems = (items) => {
  console.log("Items", items)
  const expenses = items.map(item => item.expenses).flat();
  console.log('expenses', expenses)
  return expenses.reduce((sum, { price, shared, vat, coh }) => {
    if (shared) sum.shared = sum.shared + price;
    if (!shared) sum.individual = sum.individual + price;
    if (shared && vat) sum.vatShared = sum.vatShared + price;
    if (!shared && vat) sum.vatIndividual = sum.vatIndividual + price;
    if (coh) sum['coh'] = sum.coh + price;
    console.log('sum shared', sum.shared)
    return sum
  }, {
    shared: 0,
    individual: 0,
    vatShared: 0,
    vatIndividual: 0,
    coh: 0,
    prices: [['pax', 'cost', 'mark up', 'price before tax', 'price after tax', 'price after commission', 'sales', 'cost of service', 'profit', 'VAT payable', 'IT payable', 'net income']]
  });
}



const computeTotal = ({items, min, max, markup, tax, commission}) => {
  const numToString = (num) => (num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  const reduced = reducedItems(items);
  console.log(reduced);
  for (let pax = min; pax <= max; pax++) {
    let cost = reduced.shared/pax + reduced.individual;
    let cos = cost * pax;
    let markUpCost = cost * markup;
    let priceBeforeTax = cost + markUpCost;
    let priceAfterTax = priceBeforeTax + (tax * priceBeforeTax);
    let commissionRate = commission * priceAfterTax;
    let priceAfterCommission = priceAfterTax - commissionRate;
    let sales = priceAfterCommission * pax;
    let profit = sales - cos;
    let vatableExpenses = reduced.vatShared + (pax * reduced.vatIndividual);
    let vatPayable = (sales*.12) - (vatableExpenses*.12);
    let itPayable = profit *.30;
    let netIncome = profit - (vatPayable + itPayable);
    reduced.prices[pax] = [
      pax,
      numToString(cost),
      numToString(markUpCost),
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
  return reduced;
};