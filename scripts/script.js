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
let incomeBlocks = document.querySelectorAll('.income-items');
let expensesBlocks = document.querySelectorAll('.expenses-items');




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


const appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  depositAmount: 0,
  depositInterest: 0,
  period: 1,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  additionalIncomeMonth: 0,
  expensesMonth: 0,
  startCondition: function(){
    if(isNumber(salaryAmount.value)) appData.start();
  },
  start: function() {
    appData.budget = +salaryAmount.value;
    console.log(appData.budget);
    appData.getIncome();
    appData.getAdditionalIncomeMonth();
    appData.getExpenses();
    appData.getDepositInfo();
    appData.getExpensesMonth();
    appData.getBudget();
    appData.getAddExpenses();
    appData.showResult();

    },
  showResult: function(){
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = Math.round(appData.budgetDay);
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcSavedMoney();
    periodSelector.addEventListener('input', function() {
      incomePeriodValue.value = appData.calcSavedMoney();
    });
  },
  addIncomeBlock: function(){
    const cloneIncomeBlock = incomeBlocks[incomeBlocks.length-1].cloneNode(true);
    const cloneIncomeBlockTitle = cloneIncomeBlock.querySelector('.income-title');
    cloneIncomeBlockTitle.value = '';
    const cloneIncomeBlockAmount = cloneIncomeBlock.querySelector('.income-amount');
    cloneIncomeBlockAmount.value = '';
    plusButtonIncome.before(cloneIncomeBlock);
    incomeBlocks = document.querySelectorAll('.income-items');
    if (incomeBlocks.length === 3) plusButtonIncome.style.display = 'none';
  },
  addExpensesBlock: function(){
    
    const cloneExpensesBlock = expensesBlocks[expensesBlocks.length-1].cloneNode(true);
    const cloneExpensesBlockTitle = cloneExpensesBlock.querySelector('.expenses-title');
    cloneExpensesBlockTitle.value = '';
    const cloneExpensesBlockAmount = cloneExpensesBlock.querySelector('.expenses-amount');
    cloneExpensesBlockAmount.value = '';
    plusButtonExpenses.before(cloneExpensesBlock);
    expensesBlocks = document.querySelectorAll('.expenses-items');
    if (expensesBlocks.length === 3) plusButtonExpenses.style.display = 'none';
  },
  getPeriod: function() {
    appData.period = periodSelector.value;
    periodAmount.textContent = appData.period;

  },
  getIncome: function() {
    incomeBlocks.forEach(function(item){
      const incomeTitle = item.querySelector('.income-title').value;
      const incomeAmount = item.querySelector('.income-amount').value;
      if(incomeTitle !=='' && incomeAmount !== '') {
        appData.income[incomeTitle] = incomeAmount;
      }
    });
  },
  getExpenses: function() {
    expensesBlocks.forEach(function(item){
      const expensesTitle = item.querySelector('.expenses-title').value;
      const expensesAmount = item.querySelector('.expenses-amount').value;
      if(expensesTitle !=='' && expensesAmount !== '') {
        appData.expenses[expensesTitle] = expensesAmount;
      }
    });
  },
  getAddExpenses: function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    })
  },
  asking: function() {
    const addExpenses = getText('Перечислите возможные расходы за рассчитываемый период через запятую');
          appData.addExpenses = addExpenses.toLowerCase().split(', ');
          appData.deposit = confirm('Есть ли у вас депозит в банке?');
          
    },
  getExpensesMonth: function() {
      for (let i in appData.expenses) {
        appData.expensesMonth += +appData.expenses[i];
      }
    },

  getAdditionalIncomeMonth: function() {
    for (let i in appData.income) {
        appData.additionalIncomeMonth += +appData.income[i];
      };
  },
  getBudget: function() {
       appData.budgetMonth = appData.budget + appData.additionalIncomeMonth;
       appData.budgetDay = appData.budgetMonth / 30;
    },
  getTargetMonth: function() {
      return  Math.ceil(+targetAmount.value / (appData.budgetMonth - appData.expensesMonth)) ;
    },
  getStatusIncome: function() {
      if (appData.budgetDay >= 1200) return 'У вас высокий уровень дохода';
      else if (appData.budgetDay >= 600) return 'У вас средний уровень дохода';
      else if (appData.budgetDay >= 0) return 'К сожалению, у вас уровень дохода ниже среднего';
      else { return 'Что то пошло не так';
      }
    },
  getDepositInfo: function () {
    if (appData.deposit) {
      appData.depositAmount = getNumber('Какая сумма депозита?');
      appData.depositAmount = getNumber('Укажите величину годовой процентной ставки?');
    }
  },
  calcSavedMoney: function () {
    return +periodSelector.value * (appData.budgetMonth - appData.expensesMonth);
    
  }
};


calcButton.addEventListener('click', appData.startCondition);
plusButtonIncome.addEventListener('click', appData.addIncomeBlock);
plusButtonExpenses.addEventListener('click', appData.addExpensesBlock);
periodSelector.addEventListener('input', appData.getPeriod);


// appData.asking();



console.log(appData.expensesMonth);
printTargetMonth();
console.log(appData.getStatusIncome());
printAddExpenses();

console.log("Наша программа включает в себя данные: ");

for (let i in appData) {
  let key = i;
  let value = appData[i];
  if (typeof value === 'function') value = "function";
  console.log(key + ": " + value);
}


