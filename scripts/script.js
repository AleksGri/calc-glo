'use strict';

const income = 'Uber';
const deposit = confirm('Есть ли у вас депозит в банке?');
const mission = 10e6;
const period = 12;


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


const getInput = function(question) {
  let answer;
  do {
    answer = prompt(question);
  } while (answer === null || answer.trim() === '');
  return answer;
};

const addExpenses = getInput('Перечислите возможные расходы за рассчитываемый период через запятую');


const start = function() {
  return getNumber('Ваш месячный доход?');
};

const money = start();


const getExpensesMonth = function() {
  let sum = 0;
  const expenses = [];
  
  for (let i = 0; i < 2; i++) {
    let expenseTitle = getInput('Введите обязательную статью расходов?');
    let expenseAmount = getNumber('Во сколько это обойдется?');
    expenses.push([expenseTitle, expenseAmount]);
    sum += expenseAmount;
  }
  return sum;
};

const expenseAmount = getExpensesMonth();


const getAccumulatedMonth = function() {
  return money - expenseAmount;
};

const accumulatedMonth = getAccumulatedMonth();
const budgetDay = accumulatedMonth / 30;

const printTypeOf = function(variable) {
  console.log(typeof variable);
};

const getTargetMonth = function(accumulatedMonth) {
  return  Math.ceil(mission / accumulatedMonth) ;
};

const getStatusIncome = function(localBudgetDay) {
  if (localBudgetDay >= 1200) return 'У вас высокий уровень дохода';
  else if (localBudgetDay >= 600) return 'У вас средний уровень дохода';
  else if (localBudgetDay >= 0) return 'К сожалению, у вас уровень дохода ниже среднего';
  else { return 'Что то пошло не так';
  }
};

const printTargetMonth = function() {
  const targetMonth = getTargetMonth(accumulatedMonth);
  if ( targetMonth > 0)
    console.log(`Цель будет достигнута за ${targetMonth} месяцев`);
  else { 
    console.log(`Цель не будет достигнута`);
  }
};

getTargetMonth(accumulatedMonth);


printTypeOf(money);
printTypeOf(income);
printTypeOf(deposit);
console.log(expenseAmount);
console.log(addExpenses.toLowerCase().split(', '));
printTargetMonth();
console.log('Бюджет на день: ' + budgetDay);
console.log(getStatusIncome (budgetDay));


