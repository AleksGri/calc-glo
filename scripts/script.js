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
const initialIncomeBlocks = document.querySelectorAll('.income-items');
let incomeBlocks = document.querySelectorAll('.income-items');
const initialExpensesBlocks = document.querySelectorAll('.expenses-items');
let expensesBlocks = document.querySelectorAll('.expenses-items');
let textDataFields;
let appData;



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

function AppData () {
  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.depositAmount = 0;
  this.depositInterest = 0;
  this.period = 1;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.additionalIncomeMonth = 0;
  this.expensesMonth = 0;
}

AppData.prototype.startCondition = function(){
  if(isNumber(salaryAmount.value))
  this.start();
};

AppData.prototype.start = function(){
  this.budget = +salaryAmount.value;
  this.getIncome.call(this);
  this.getAdditionalIncomeMonth.call(this);
  this.getExpenses.call(this);
  this.getDepositInfo.call(this);
  this.getExpensesMonth.call(this);
  this.getBudget.call(this);
  this.getAddExpenses.call(this);
  this.showResult.call(this);
  this.textFieldsDisabler.call(this);
  console.dir(appData); 
};

AppData.prototype.showResult = function(){
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = Math.round(this.budgetDay);
  targetMonthValue.value = this.getTargetMonth();
  incomePeriodValue.value = this.calcSavedMoney();
  periodSelector.addEventListener('input', this.updateByPeriod.bind(this));
};

AppData.prototype.updateByPeriod = function(){
  incomePeriodValue.value = this.calcSavedMoney.call(this);
};

AppData.prototype.reset = function(){
  textDataFields.forEach(function(item){
    item.value = '';
    item.removeAttribute('readOnly');
    item.style.background = '#ffffff';
  });
  calcButton.style.display = 'block';
  plusButtonExpenses.style.display = 'block';
  plusButtonIncome.style.display = 'block';
  cancelButton.style.display = 'none';
  appData = new AppData();
  console.dir(appData);

  // for (let prop in appDataClone) {
  //   this[prop] = appDataClone[prop];
  // }
  while(incomeBlocks.length > 1) {
    incomeBlocks[incomeBlocks.length-1].remove();
    incomeBlocks = document.querySelectorAll('.income-items');
  }
  while(expensesBlocks.length > 1) {
    expensesBlocks[expensesBlocks.length-1].remove();
    expensesBlocks = document.querySelectorAll('.expenses-items');
  }
  this.showResult.call(this);
};

AppData.prototype.addIncomeBlock = function(){
  const cloneIncomeBlock = incomeBlocks[incomeBlocks.length-1].cloneNode(true);
  const cloneIncomeBlockTitle = cloneIncomeBlock.querySelector('.income-title');
  cloneIncomeBlockTitle.value = '';
  const cloneIncomeBlockAmount = cloneIncomeBlock.querySelector('.income-amount');
  cloneIncomeBlockAmount.value = '';
  plusButtonIncome.before(cloneIncomeBlock);
  incomeBlocks = document.querySelectorAll('.income-items');
  if (incomeBlocks.length === 3) plusButtonIncome.style.display = 'none';
};

AppData.prototype.addExpensesBlock = function(){
  const cloneExpensesBlock = expensesBlocks[expensesBlocks.length-1].cloneNode(true);
  const cloneExpensesBlockTitle = cloneExpensesBlock.querySelector('.expenses-title');
  cloneExpensesBlockTitle.value = '';
  const cloneExpensesBlockAmount = cloneExpensesBlock.querySelector('.expenses-amount');
  cloneExpensesBlockAmount.value = '';
  plusButtonExpenses.before(cloneExpensesBlock);
  expensesBlocks = document.querySelectorAll('.expenses-items');
  if (expensesBlocks.length === 3) plusButtonExpenses.style.display = 'none';
}

AppData.prototype.getPeriod = function(){
  this.period = periodSelector.value;
  periodAmount.textContent = this.period;
};

AppData.prototype.getIncome = function(){
  incomeBlocks.forEach(function(item,){
    const incomeTitle = item.querySelector('.income-title').value;
    const incomeAmount = item.querySelector('.income-amount').value;
    if(incomeTitle !=='' && incomeAmount !== '') {
      this.income[incomeTitle] = incomeAmount;
    }
  }, this);
}

AppData.prototype.getExpenses = function(){
  expensesBlocks.forEach(function(item){
    const expensesTitle = item.querySelector('.expenses-title').value;
    const expensesAmount = item.querySelector('.expenses-amount').value;
    if(expensesTitle !=='' && expensesAmount !== '') {
      this.expenses[expensesTitle] = expensesAmount;
    }
  },this);
}

AppData.prototype.getAddExpenses = function(){
  let addExpenses = additionalExpensesItem.value.split(',');
  addExpenses.forEach(function(item){
    item.trim();
    if (item !== '') {
      this.addExpenses.push(item);
    }
  }, this)
}

AppData.prototype.asking  = function(){
  const addExpenses = getText('Перечислите возможные расходы за рассчитываемый период через запятую');
  this.addExpenses = addExpenses.toLowerCase().split(', ');
  this.deposit = confirm('Есть ли у вас депозит в банке?');
          
}

AppData.prototype.getExpensesMonth = function(){
  for (let i in this.expenses) {
    this.expensesMonth += +this.expenses[i];
  }
}

AppData.prototype.getAdditionalIncomeMonth = function(){
  for (let i in this.income) {
    this.additionalIncomeMonth += +this.income[i];
  };
}

AppData.prototype.getBudget = function(){
  this.budgetMonth = this.budget + this.additionalIncomeMonth;
  this.budgetDay = this.budgetMonth / 30;
}

AppData.prototype.getTargetMonth = function(){
  return  Math.ceil(+targetAmount.value / (this.budgetMonth - this.expensesMonth)) ;
}

AppData.prototype.getStatusIncome = function(){
  if (this.budgetDay >= 1200) return 'У вас высокий уровень дохода';
  else if (this.budgetDay >= 600) return 'У вас средний уровень дохода';
  else if (this.budgetDay >= 0) return 'К сожалению, у вас уровень дохода ниже среднего';
  else { return 'Что то пошло не так';
  }
}

AppData.prototype.getDepositInfo = function(){
  if (this.deposit) {
    this.depositAmount = getNumber('Какая сумма депозита?');
    this.depositAmount = getNumber('Укажите величину годовой процентной ставки?');
  }
}

AppData.prototype.calcSavedMoney = function(){
  return +periodSelector.value * (this.budgetMonth - this.expensesMonth);
}

AppData.prototype.textFieldsDisabler = function(){
  textDataFields = document.querySelector('.data').querySelectorAll('input[type=text]');
  textDataFields.forEach(function(item) {
    item.setAttribute('readOnly','1');
    item.style.background = 'rgba(255,127,99,.26)';
  })
  calcButton.style.display = 'none';
  plusButtonExpenses.style.display = 'none';
  plusButtonIncome.style.display = 'none';
  cancelButton.style.display = 'block';
}

AppData.prototype.listeners = function() {
  calcButton.addEventListener('click', this.startCondition.bind(this));
  plusButtonIncome.addEventListener('click', this.addIncomeBlock);
  plusButtonExpenses.addEventListener('click', this.addExpensesBlock);
  periodSelector.addEventListener('input', this.getPeriod.bind(this));
  cancelButton.addEventListener('click', this.reset.bind(this));
}


appData = new AppData();
appData.listeners();




// const appDataClone = JSON.parse(JSON.stringify(appData));





