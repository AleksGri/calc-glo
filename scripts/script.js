'use strict';

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

const money = start();

const appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 1000000,
  period: 12,
  asking: function() {
    const addExpenses = getInput('Перечислите возможные расходы за рассчитываемый период через запятую');
          appData.addExpenses = addExpenses.toLowerCase().split(', ');
          appData.deposit = confirm('Есть ли у вас депозит в банке?');
          for (let i = 0; i < 2; i++) {
            let expenseTitle = getInput('Введите обязательную статью расходов?');
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
    }
};

appData.asking();


console.log(appData.expensesMonth);
printTargetMonth();
console.log(appData.getStatusIncome());

console.log("Наша программа включает в себя данные: ");

for (let i in appData) {
  let key = i;
  let value = appData[i];
  if (typeof value === 'function') value = "function";
  console.log(key + ": " + value);
}


