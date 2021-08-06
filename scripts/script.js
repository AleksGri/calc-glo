'use strict';

const money = +prompt('Ваш месячный доход?');;
const income = 'Uber';
const addExpenses = prompt(
  'Перечислите возможные расходы за рассчитываемый период через запятую”');
const deposit = confirm('Есть ли у вас депозит в банке?');
const expenses1 = prompt('Введите обязательную статью расходов?');
const amount1 = +prompt('“Во сколько это обойдется?”');
const expenses2 = prompt('Введите обязательную статью расходов?');
const amount2 = +prompt('“Во сколько это обойдется?”');
const mission = 10e6;
const period = 12;
const accumulatedMonth = getAccumulatedMonth();
const budgetDay = accumulatedMonth / 30;

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(getExpensesMonth());
console.log(addExpenses.toLowerCase().split(', '));
console.log(`Период равен ${getTargetMonth(accumulatedMonth)} месяцев`);
console.log('Бюджет на день: ' + budgetDay);
console.log(getStatusIncome (budgetDay));


function showTypeOf(variable) {
  console.log(typeof variable);
}

function getExpensesMonth () {
  return amount1 + amount2;
}

function getAccumulatedMonth () {
  return money - getExpensesMonth ();
}

function getTargetMonth (accumulatedMonth) {
  if (accumulatedMonth > 0) return  Math.ceil(mission / accumulatedMonth) ;
  else {
    return -1;
      }
}

function getStatusIncome (localBudgetDay) {
  if (localBudgetDay >= 1200) return 'У вас высокий уровень дохода';
  else if (localBudgetDay >= 600) return 'У вас средний уровень дохода';
  else if (localBudgetDay >= 0) return 'К сожалению, у вас уровень дохода ниже среднего';
  else { return 'Что то пошло не так';
  }
}

