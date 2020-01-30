import React, { useState, createRef } from 'react';

export const PricingContext = React.createContext();

const initialState = {
  name: 'Tom',
  expenses: [
    {
      day: 1,
      id: 'cb5w83n8zgkzibxhxczts',
      item: "Crocodile Park",
      type: "entrance fee",
      price: 200,
      shared: false,
      vat: true,
      coh: true,
      remarks: "",
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
  const [state, updateState] = useState(initialState);
  const [days, updateDays] = useState(1)

  const actions = {
    addNewDay() {
      console.log("Add new day passed to context")
      updateDays(days + 1);
    },

    removeDay(day) {
      console.log(`Remove day ${day}`);
      updateDays(days - 1);
      const expenses = state.expenses.filter(expense => expense.day !== day)
      expenses.forEach(expense => {
        if (expense.day > day) expense.day--
      })
      updateState({
        ...state, 
        expenses: expenses
      })
    },

    priceItemSubmit(data) {
      console.log('Submitted', data);
      if (data.item === "") return;
      if (data.price === 0 || data.price < 0) return;
      if (state.expenses.find(expense => expense.item === data.item)) return
      const expenses = [...state.expenses, data]
      console.log(expenses)
      const total = computeTotal({...state, expenses})
      updateState({ ...state, expenses, total })
    },

    updatePriceItem(expense) {
      console.log('Update Price Item', expense)
      if (expense.item === "") return;
      if (expense.price === 0 || expense.price < 0) return;
      let expenses = [...state.expenses];
      const index = expenses.findIndex(exp => exp.id === expense.id)
      expenses[index] = expense;
      updateState({ ...state, expenses })
    },

    updateTaxMarkUp({ markup, tax, min, max, commission }) {
      updateState({ ...state, markup, tax, min, max, commission });
    },
  };
  const { children } = props
  return (
    <PricingContext.Provider value={{ ...state, days, ...actions }}>
      {children}
    </PricingContext.Provider>
  )
};

const reducedExpenses = (expenses) => {
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



const computeTotal = ({ expenses, min, max, markup, tax, commission }) => {
  const numToString = (num) => (num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  const reduced = reducedExpenses(expenses);
  console.log(reduced);
  for (let pax = min; pax <= max; pax++) {
    let cost = reduced.shared / pax + reduced.individual;
    let cos = cost * pax;
    let markUpCost = cost * markup;
    let priceBeforeTax = cost + markUpCost;
    let priceAfterTax = priceBeforeTax + (tax * priceBeforeTax);
    let commissionRate = commission * priceAfterTax;
    let priceAfterCommission = priceAfterTax - commissionRate;
    let sales = priceAfterCommission * pax;
    let profit = sales - cos;
    let vatableExpenses = reduced.vatShared + (pax * reduced.vatIndividual);
    let vatPayable = (sales * .12) - (vatableExpenses * .12);
    let itPayable = profit * .30;
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