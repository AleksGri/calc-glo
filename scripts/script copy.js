'use strict';

const calcButton = document.getElementById('start');
const plusButtonIncome = document.querySelectorAll('button.income_add')[0];
const plusButtonExpenses = document.querySelectorAll('button.expenses_add')[0];
const depositCheckBox = document.querySelector('.deposit-checkmark');
const additionalIncomeTitle = document.querySelectorAll('.additional_income-item')[0];
const additionalIncomeAmount = document.querySelectorAll('.additional_income-amount')[0];
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelector('.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositInterest = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
const periodSelector = document.querySelector('.period-select');
const cancelButton = document.getElementById('cancel');
const periodAmount = document.querySelector('.period-amount');
const initialIncomeBlocks = document.querySelectorAll('.income-items');
let incomeBlocks = document.querySelectorAll('.income-items');
const initialExpensesBlocks = document.querySelectorAll('.expenses-items');
let expensesBlocks = document.querySelectorAll('.expenses-items');
let textDataFields;




const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const getNumber = function(question) {
  let answer;
  do {
    answer = getInput(question);
  } while (!isNumber(answer));
  return +answer;
};

const getText = function(question) {
  let answer;
  do {
    answer = getInput(question);
  } while (isNumber(answer));
  return answer;
};

const getInput = function(question) {
  let answer;
  do {
    answer = prompt(question);
  } while (answer === null || answer.trim() === '');
  return answer;
};

const printTargetMonth = function() {
  const targetMonth = appData.getTargetMonth();
  if ( targetMonth > 0)
    console.log(`Цель будет достигнута за ${targetMonth} месяцев`);
  else { 
    console.log(`Цель не будет достигнута`);
  }
};

const printAddExpenses = function() {
  let resultString = '';
  for (let i = 0; i < appData.addExpenses.length; i++ ) {
    resultString += appData.addExpenses[i].slice(0,1).toUpperCase() + appData.addExpenses[i].slice(1) + ', ';
  }
  resultString = resultString.slice(0,-2);
  console.log(resultString);
};



const appDataClone = JSON.parse(JSON.stringify(appData));
calcButton.addEventListener('click', appData.startCondition.bind(appData));
plusButtonIncome.addEventListener('click', appData.addIncomeBlock);
plusButtonExpenses.addEventListener('click', appData.addExpensesBlock);
periodSelector.addEventListener('input', appData.getPeriod.bind(appData));
cancelButton.addEventListener('click', appData.reset.bind(appData));




