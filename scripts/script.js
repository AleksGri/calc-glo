'use strict';

const calcButton = document.getElementById('start');
const plusButtonIncome = document.getElementsByTagName('.income button')[0];
const plusButtonExpenses = document.getElementsByTagName('.expenses button')[0];
const depositCheckBox = document.querySelector('.deposit-check')[0];
const additionalIncomeItem = document.querySelectorAll('.income-items');
const budgetMonthValue = document.getElementsByClassName('budget_month-value');
const budgetDayValue = document.getElementsByClassName('budget_day-value');
const expensesMonthValue = document.getElementsByClassName('expenses_month-value');
const additionalIncomeValue = document.getElementsByClassName('additional_income-value');
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value');
const incomePeriodValue = document.getElementsByClassName('income_period-value');
const targetMonthValue = document.getElementsByClassName('target_month-value');
const salaryAmount = document.getElementsByClassName('salary-amount');
const additionalIncomeTitle = document.getElementsByClassName('additional_income-item');
const additionalIncomeAmount = document.getElementsByClassName('additional_income-amount');
const additionalExpensesItem = document.getElementsByClassName('additional_expenses-item');
const periodSelector = document.getElementsByClassName('period-select');





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

const start = function() {
  return getNumber('Ваш месячный доход?');
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


const money = start();

const appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  depositAmount: 0,
  depositInterest: 0,
  mission: 1000000,
  period: 12,
  asking: function() {
    if(confirm('Есть ли у вас источник дополнительного дохода?')) {
      const incomeTitle = getText('Какой у Вас дополнительный заработок?');
      const incomeAmount = getNumber('Сколько это Вам приносит?');
          appData.income[incomeTitle] = incomeAmount;
    }
    const addExpenses = getText('Перечислите возможные расходы за рассчитываемый период через запятую');
          appData.addExpenses = addExpenses.toLowerCase().split(', ');
          appData.deposit = confirm('Есть ли у вас депозит в банке?');
          this.getDepositInfo();
          for (let i = 0; i < 2; i++) {
            let expenseTitle = getText('Введите обязательную статью расходов?');
            let expenseAmount = getNumber('Во сколько это обойдется?');
            appData.expenses[expenseTitle] = expenseAmount;
          }
          this.getExpensesMonth();
          this.getBudget();
    },
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  getExpensesMonth: function() {
      for (let i in appData.expenses) {
        appData.expensesMonth += appData.expenses[i];
      }
    },
  getBudget: function() {
       appData.budgetMonth = appData.budget - appData.expensesMonth;
       appData.budgetDay = appData.budgetMonth / 30;
    },
  getTargetMonth: function() {
      return  Math.ceil(appData.mission / appData.budgetMonth) ;
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
    return appData.period * appData.budgetMonth;
    
  }
};

appData.asking();


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


