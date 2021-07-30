let money, income, addExpenses, deposit, mission;
let period;

alert('Alert message');

console.log('Console message');

// Lesson02
// 1)
money = 16000;
income = 'Uber';
addExpenses = 'Internet, Taxi, Utilities';
deposit = true;
mission = 10e6;
period = 12;

//2)
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев`);
console.log('Цель заработать ' + mission + ' долларов');

let expensesArray = addExpenses.toLowerCase().split(', ');
console.log(expensesArray);

let budgetDay = money / 30;
console.log(budgetDay);


