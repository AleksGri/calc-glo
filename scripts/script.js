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


const appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  depositAmount: 0,
  depositInterest: 0,
  period: 1,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  additionalIncomeMonth: 0,
  expensesMonth: 0,
  startCondition: function(){
    if(isNumber(salaryAmount.value))
    this.start();
  },
  start: function() {
    console.log(this);
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
  },
  showResult: function(){
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.round(this.budgetDay);
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelector.addEventListener('input', this.updateByPeriod.bind(this));
  },
  updateByPeriod:function() {
      incomePeriodValue.value = this.calcSavedMoney.call(this);
  },
  reset: function() {
    textDataFields.forEach(function(item){
      item.value = '';
      item.removeAttribute('readOnly');
      item.style.background = '#ffffff';
    });
    calcButton.style.display = 'block';
    plusButtonExpenses.style.display = 'block';
    plusButtonIncome.style.display = 'block';
    cancelButton.style.display = 'none';
    for (let prop in appDataClone) {
      this[prop] = appDataClone[prop];
    }
    while(incomeBlocks.length > 1) {
      incomeBlocks[incomeBlocks.length-1].remove();
      incomeBlocks = document.querySelectorAll('.income-items');
    }
    while(expensesBlocks.length > 1) {
      expensesBlocks[expensesBlocks.length-1].remove();
      expensesBlocks = document.querySelectorAll('.expenses-items');
    }
    this.showResult.call(this);
  },
  addIncomeBlock: function(){
    const cloneIncomeBlock = incomeBlocks[incomeBlocks.length-1].cloneNode(true);
    const cloneIncomeBlockTitle = cloneIncomeBlock.querySelector('.income-title');
    cloneIncomeBlockTitle.value = '';
    const cloneIncomeBlockAmount = cloneIncomeBlock.querySelector('.income-amount');
    cloneIncomeBlockAmount.value = '';
    plusButtonIncome.before(cloneIncomeBlock);
    incomeBlocks = document.querySelectorAll('.income-items');
    if (incomeBlocks.length === 3) plusButtonIncome.style.display = 'none';
  },
  addExpensesBlock: function(){
    
    const cloneExpensesBlock = expensesBlocks[expensesBlocks.length-1].cloneNode(true);
    const cloneExpensesBlockTitle = cloneExpensesBlock.querySelector('.expenses-title');
    cloneExpensesBlockTitle.value = '';
    const cloneExpensesBlockAmount = cloneExpensesBlock.querySelector('.expenses-amount');
    cloneExpensesBlockAmount.value = '';
    plusButtonExpenses.before(cloneExpensesBlock);
    expensesBlocks = document.querySelectorAll('.expenses-items');
    if (expensesBlocks.length === 3) plusButtonExpenses.style.display = 'none';
  },
  getPeriod: function() {
    console.log(this);
    this.period = periodSelector.value;
    periodAmount.textContent = this.period;
  },
  getIncome: function() {
    console.log('this of getIncome 1',this);
    incomeBlocks.forEach(function(item,){
      const incomeTitle = item.querySelector('.income-title').value;
      const incomeAmount = item.querySelector('.income-amount').value;
      if(incomeTitle !=='' && incomeAmount !== '') {
        console.log('this of getIncome',this);
        this.income[incomeTitle] = incomeAmount;
      }
    }, this);
  },
  getExpenses: function() {
    expensesBlocks.forEach(function(item){
      const expensesTitle = item.querySelector('.expenses-title').value;
      const expensesAmount = item.querySelector('.expenses-amount').value;
      if(expensesTitle !=='' && expensesAmount !== '') {
        this.expenses[expensesTitle] = expensesAmount;
      }
    },this);
  },
  getAddExpenses: function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    }, this)
  },
  asking: function() {
    const addExpenses = getText('Перечислите возможные расходы за рассчитываемый период через запятую');
          this.addExpenses = addExpenses.toLowerCase().split(', ');
          this.deposit = confirm('Есть ли у вас депозит в банке?');
          
    },
  getExpensesMonth: function() {
      for (let i in this.expenses) {
        this.expensesMonth += +this.expenses[i];
      }
    },

  getAdditionalIncomeMonth: function() {
    for (let i in this.income) {
        this.additionalIncomeMonth += +this.income[i];
      };
  },
  getBudget: function() {
       this.budgetMonth = this.budget + this.additionalIncomeMonth;
       this.budgetDay = this.budgetMonth / 30;
    },
  getTargetMonth: function() {
      return  Math.ceil(+targetAmount.value / (this.budgetMonth - this.expensesMonth)) ;
    },
  getStatusIncome: function() {
      if (this.budgetDay >= 1200) return 'У вас высокий уровень дохода';
      else if (this.budgetDay >= 600) return 'У вас средний уровень дохода';
      else if (this.budgetDay >= 0) return 'К сожалению, у вас уровень дохода ниже среднего';
      else { return 'Что то пошло не так';
      }
    },
  getDepositInfo: function () {
    if (this.deposit) {
      this.depositAmount = getNumber('Какая сумма депозита?');
      this.depositAmount = getNumber('Укажите величину годовой процентной ставки?');
    }
  },
  calcSavedMoney: function () {
    return +periodSelector.value * (this.budgetMonth - this.expensesMonth);
  },
  textFieldsDisabler: function () {
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
};

const appDataClone = JSON.parse(JSON.stringify(appData));
calcButton.addEventListener('click', appData.startCondition.bind(appData));
plusButtonIncome.addEventListener('click', appData.addIncomeBlock);
plusButtonExpenses.addEventListener('click', appData.addExpensesBlock);
periodSelector.addEventListener('input', appData.getPeriod.bind(appData));
cancelButton.addEventListener('click', appData.reset.bind(appData));




