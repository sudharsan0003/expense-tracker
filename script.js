'use strict';

const balanceEl = document.getElementById('balance');
const moneyPlusEl = document.getElementById('money-plus');
const moneyMinusEl = document.getElementById('money-minus');
const listEl = document.getElementById('list');
const formEl = document.getElementById('form');
const transactionEl = document.getElementById('transaction');
const amountEl = document.getElementById('amount');

const btnEl = document.getElementById('final-btn');
// console.log(btnEl);

//global variables
let transactions = [];
let income = 0;
let expense = 0;
let balance = 0;

//function
function init() {
  listEl.innerHTML = null;
}

function deleteTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id != id);
  init();
  //re added elements
  transactions.forEach((transaction) => {
    addTransactionToDom(transaction);
  });
  updateValues();
}

function addTransactionToDom({ id, name, amount }) {
  //create li element
  const liEl = document.createElement('li');
  //add class name for color
  liEl.className = amount > 0 ? 'plus' : 'minus';
  //innerhtml
  liEl.innerHTML = `
  <span>${name}</span>
  <span>₹${amount}</span>
  <button class = 'delete-btn' onclick = deleteTransaction(${id})>x</button>
  `;
  //to append
  listEl.appendChild(liEl);
}

function updateValues() {
  income = transactions
    .map((transaction) => transaction.amount)
    .filter((val) => val > 0)
    .reduce((prev, val) => prev + val, 0);

  expense = transactions
    .map((transaction) => transaction.amount)
    .filter((val) => val < 0)
    .reduce((prev, val) => prev + val, 0);

  balance = transactions
    .map((transaction) => transaction.amount)
    .reduce((prev, val) => prev + val, 0);

  moneyPlusEl.innerText = `₹${income}`;
  moneyMinusEl.innerText = `₹${expense * -1}`;
  balanceEl.innerText = `${balance}`;
}

//addeventlistener
formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  if (transactionEl.value.trim() === '' || amountEl.value.trim() === '') {
    alert('You have to enter Transaction details');
  } else {
    const transaction = {
      id: Date.now(),
      name: transactionEl.value,
      amount: Number(amountEl.value),
    };
    //sent to array
    transactions.push(transaction);
    //sent to Dom
    addTransactionToDom(transaction);
  }
  transactionEl.value = null;
  amountEl.value = null;

  //update the values to main

  updateValues();

  //local storage
  // function updateValues() {
  //   localStorage.setItem('data', listEl.innerHTML);
  // }

  // function showData() {
  //   listEl.innerHTML = localStorage.getItem('data');
  // }
  // showData();
});
//init
init();

/* hint */
// const amountArr = transactions.map((transaction) => transaction.amount);
// const incomeArr = amountArr.filter((val) => val > 0);
// const expenseArr = amountArr.filter((val) => val < 0);

// //income
// console.log(incomeArr.reduce((prev, val) => prev + val, 0));
// //expense
// console.log(expenseArr.reduce((prev, val) => prev + val, 0));
