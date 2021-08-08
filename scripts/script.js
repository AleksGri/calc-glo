'use strict';

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
};

const isText = function(string) {
  return  string !== null && string.trim() !== '';
};

const getNumber = function(question) {
  let answer;
  do {
    answer = prompt(question);
  } while (!isNumber(answer));
  return +answer;
};

const getText = function(question) {
  let answer;
  do {
    answer = prompt(question);
  } while (!isText(answer));
  return answer;
};

const start = function() {
  return getNumber('Ваш месячный доход?');
};

const money = start();
const income = 'Uber';
const addExpenses = getText('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке?');
const mission = 10e6;
const period = 12;
const expenseAmount = getExpensesMonth();
const accumulatedMonth = getAccumulatedMonth();
const budgetDay = accumulatedMonth / 30;

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log(expenseAmount);
console.log(addExpenses.toLowerCase().split(', '));
getTargetMonth(accumulatedMonth);
printTargetMonth();
console.log('Бюджет на день: ' + budgetDay);
console.log(getStatusIncome (budgetDay));


function showTypeOf(variable) {
  console.log(typeof variable);
}

function getExpensesMonth () {
  let sum = 0;
  const expenses = [];
  
  for (let i = 0; i < 2; i++) {
    let expenseTitle = getText('Введите обязательную статью расходов?');
    let expenseAmount = getNumber('Во сколько это обойдется?');
    expenses.push([expenseTitle, expenseAmount]);
    sum += expenseAmount;
  }
  return sum;
}

function getAccumulatedMonth () {
  return money - expenseAmount;
}

function getTargetMonth (accumulatedMonth) {
  return  Math.ceil(mission / accumulatedMonth) ;
}

function getStatusIncome (localBudgetDay) {
  if (localBudgetDay >= 1200) return 'У вас высокий уровень дохода';
  else if (localBudgetDay >= 600) return 'У вас средний уровень дохода';
  else if (localBudgetDay >= 0) return 'К сожалению, у вас уровень дохода ниже среднего';
  else { return 'Что то пошло не так';
  }
}

function printTargetMonth() {
  const targetMonth = getTargetMonth(accumulatedMonth);
  if ( targetMonth > 0)
    console.log(`Цель будет достигнута за ${targetMonth} месяцев`);
  else { 
    console.log(`Цель не будет достигнута`);
  }
}

