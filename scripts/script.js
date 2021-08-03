'use strict';
//alert('Alert message');

//console.log('Console message');

// Lesson02
// 1)
let money = 16000;
const income = 'Uber';
let addExpenses = 'Internet, Taxi, Utilities';
let deposit = true;
const mission = 10e6;
const period = 12;
let budgetDay = money / 30;

//2)
console.log(typeof money + ' ' + typeof income + ' ' + typeof deposit);

console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев`);
console.log('Цель заработать ' + mission + ' долларов');

console.log(addExpenses.toLowerCase().split(', '));

console.log('Бюджет на день: ' + budgetDay);



// Lesson03
// 2)
money = +prompt('Ваш месячный доход?');

//3)
addExpenses = prompt(
  'Перечислите возможные расходы за рассчитываемый период через запятую”');

//4)
deposit = confirm('Есть ли у вас депозит в банке?');

//5)
const expenses1 = prompt('Введите обязательную статью расходов?');
const amount1 = +prompt('“Во сколько это обойдется?”');
const expenses2 = prompt('Введите обязательную статью расходов?');
const amount2 = +prompt('“Во сколько это обойдется?”');

//6)
const budgetMonth = money - amount1 - amount2;

//7)
if (budgetMonth > 0) console.log(
    `Цель будет достигнута за ${Math.ceil(mission / budgetMonth)} месяцев`);
else {
  console.log(`Цель не будет достигнута никогда`);
}

//8)
budgetDay = budgetMonth / 30;
console.log(
  `Бюджет на день: ${Math.floor(budgetDay)}`);

  //9)
if (budgetDay >= 1200) console.log(
  'У вас высокий уровень дохода');
else if (budgetDay >= 600) console.log(
  'У вас средний уровень дохода');
else if (budgetDay >= 0 ) console.log(
  'К сожалению, у вас уровень дохода ниже среднего');
else {
  console.log(
  'Что то пошло не так');
}




