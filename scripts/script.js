'use strict';
alert('Alert message');

console.log('Console message');

// Lesson02
// 1)
const money = 16000;
const income = 'Uber';
const addExpenses = 'Internet, Taxi, Utilities';
const deposit = true;
const mission = 10e6;
const period = 12;
const budgetDay = money / 30;

//2)
console.log(typeof money + ' ' + typeof income + ' ' + typeof deposit);

console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев`);
console.log('Цель заработать ' + mission + ' долларов');

console.log(addExpenses.toLowerCase().split(', '));

console.log(budgetDay);


