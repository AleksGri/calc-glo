'use strict';
alert('Alert message');

console.log('Console message');

// Lesson02
// 1)
let money = 16000;
let income = 'Uber';
let addExpenses = 'Internet, Taxi, Utilities';
let deposit = true;
const mission = 10e6;
let period = 12;
let budgetDay;

//2)
console.log(typeof money + ' ' + typeof income + ' ' + typeof deposit);

console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев`);
console.log('Цель заработать ' + mission + ' долларов');

console.log(addExpenses.toLowerCase().split(', '));

budgetDay = money / 30;
console.log(budgetDay);


