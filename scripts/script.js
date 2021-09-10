'use strict';

const calcButton = document.getElementById('start');
const plusButtonIncome = document.querySelectorAll('button.income_add')[0];
const plusButtonExpenses = document.querySelectorAll('button.expenses_add')[0];
const depositCheckBox = document.querySelector('#deposit-check');
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
const depositAmountInput = document.querySelector('.deposit-amount');
const depositInterestInput = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
const periodSelector = document.querySelector('.period-select');
const cancelButton = document.getElementById('cancel');
const periodAmount = document.querySelector('.period-amount');
const initialIncomeBlocks = document.querySelectorAll('.income-items');
let incomeBlocks = document.querySelectorAll('.income-items');
const initialExpensesBlocks = document.querySelectorAll('.expenses-items');
let expensesBlocks = document.querySelectorAll('.expenses-items');
let textDataFields;



const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const getNumber = (question) => {
  let answer;
  do {
    answer = getInput(question);
  } while (!isNumber(answer));
  return +answer;
};

const getText = (question) => {
  let answer;
  do {
    answer = getInput(question);
  } while (isNumber(answer));
  return answer;
};

const getInput = (question) => {
  let answer;
  do {
    answer = prompt(question);
  } while (answer === null || answer.trim() === '');
  return answer;
};

class AppData {
  constructor() {
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

  errorHendler() {
    if(!isNumber(salaryAmount.value)) {
      alert('Введите число в поле "Месячный доход"!!');
      salaryAmount.value = '';
    } else if (depositCheckBox.checked && depositBank.value === '') {
      alert('Необходимо выбрать банк либо отключить депозит');
    } else if (depositCheckBox.checked && depositAmountInput.value === '') {
      alert('Необходимо ввести сумму депозита либо отключить депозит');
    } else if (depositCheckBox.checked &&
                depositBank.value === 'other' &&
                depositInterestInput.value === '') {
      alert('Необходимо ввести величину процента по депозиту либо отключить депозит');
    } else {
      this.start();
    }
  }

  start() {
    this.budget = +salaryAmount.value;
    this.getIncome();
    this.getAdditionalIncomeMonth();
    this.getExpenses();
    this.getDepositInfo();
    this.getExpensesMonth();
    this.getBudget();
    this.getAddExpenses();
    this.showResult();
    this.textFieldsDisabler();
  }

  showResult() {
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.round(this.budgetDay);
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelector.addEventListener('input', this.updateByPeriod.bind(this));
  }

  updateByPeriod() {
    incomePeriodValue.value = this.calcSavedMoney();
  }

  reset() {
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

    textDataFields.forEach((item) => {
      item.value = '';
      item.removeAttribute('readOnly');
      item.style.background = '#ffffff';
    });
    depositCheckBox.checked = false;
    depositBank.value = '';
    depositBank.removeAttribute('disabled');
    calcButton.style.display = 'block';
    plusButtonExpenses.style.display = 'block';
    plusButtonIncome.style.display = 'block';
    cancelButton.style.display = 'none';
    while(incomeBlocks.length > 1) {
      incomeBlocks[incomeBlocks.length-1].remove();
      incomeBlocks = document.querySelectorAll('.income-items');
    }
    while(expensesBlocks.length > 1) {
      expensesBlocks[expensesBlocks.length-1].remove();
      expensesBlocks = document.querySelectorAll('.expenses-items');
    }
    depositBank.style.display = 'none';
    depositAmountInput.style.display = 'none';
    depositInterestInput.style.display = 'none';
    this.showResult.call(this);
  }

  addIncomeBlock() {
    const cloneIncomeBlock = incomeBlocks[incomeBlocks.length-1].cloneNode(true);
    const cloneIncomeBlockTitle = cloneIncomeBlock.querySelector('.income-title');
    cloneIncomeBlockTitle.value = '';
    const cloneIncomeBlockAmount = cloneIncomeBlock.querySelector('.income-amount');
    cloneIncomeBlockAmount.value = '';
    plusButtonIncome.before(cloneIncomeBlock);
    incomeBlocks = document.querySelectorAll('.income-items');
    if (incomeBlocks.length === 3) plusButtonIncome.style.display = 'none';
  }

  addExpensesBlock() {
    const cloneExpensesBlock = expensesBlocks[expensesBlocks.length-1].cloneNode(true);
    const cloneExpensesBlockTitle = cloneExpensesBlock.querySelector('.expenses-title');
    cloneExpensesBlockTitle.value = '';
    const cloneExpensesBlockAmount = cloneExpensesBlock.querySelector('.expenses-amount');
    cloneExpensesBlockAmount.value = '';
    plusButtonExpenses.before(cloneExpensesBlock);
    expensesBlocks = document.querySelectorAll('.expenses-items');
    if (expensesBlocks.length === 3) plusButtonExpenses.style.display = 'none';
  }

  addDepositBlock() {
    if (depositCheckBox.checked) {
      depositBank.style.display = 'block';
      depositAmountInput.style.display = 'block';
      this.deposit = true;
    } else {
      depositBank.style.display = 'none';
      depositAmountInput.style.display = 'none';
      depositInterestInput.style.display = 'none';
      this.deposit = false;
      this.depositAmount = 0;
      this.depositInterest = 0;
    }
  }

  addInterestInput () {
    if (depositBank.value === 'other') {
        depositInterestInput.style.display = 'block';
    } else {
        depositInterestInput.style.display = 'none';
    }
  }

  depositAmountInputChecker() {
    if(depositAmountInput.value === '') {}
    else if (!isNumber(depositAmountInput.value)) {
      alert('Сумма депозита должна быть числом');
      depositAmountInput.value = '';
    }
  }

  depositInterestInputChecker() {
    if(depositInterestInput.value === '') {}
    else if (!isNumber(depositInterestInput.value)) {
      alert('Сумма депозита должна быть числом');
      depositInterestInput.value = '';
    } else {
      if (depositInterestInput.value > 100 || depositInterestInput.value < 0) {
        alert('Введите в поле проценты значение в диапазоне от 0 до 100');
        depositInterestInput.value = '';
      }
    }
  }

  getPeriod() {
    this.period = periodSelector.value;
    periodAmount.textContent = this.period;
  }

  getIncome() {
    incomeBlocks.forEach((item) => {
      const incomeTitle = item.querySelector('.income-title').value;
      const incomeAmount = item.querySelector('.income-amount').value;
      if(incomeTitle !=='' && incomeAmount !== '') {
        this.income[incomeTitle] = incomeAmount;
      }
    }, this);
  }

  getExpenses(){
    expensesBlocks.forEach((item) => {
      const expensesTitle = item.querySelector('.expenses-title').value;
      const expensesAmount = item.querySelector('.expenses-amount').value;
      if(expensesTitle !=='' && expensesAmount !== '') {
        this.expenses[expensesTitle] = expensesAmount;
      }
    },this);
  }

  getAddExpenses(){
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    }, this)
  }

  getExpensesMonth() {
    for (let i in this.expenses) {
      this.expensesMonth += +this.expenses[i];
    }
  }

  getAdditionalIncomeMonth() {
    for (let i in this.income) {
      this.additionalIncomeMonth += +this.income[i];
    };
  }

  getBudget() {
    this.budgetMonth = this.budget + this.additionalIncomeMonth + this.depositAmount * this.depositInterest / 100 / 12;
    this.budgetDay = this.budgetMonth / 30;
  }

  getTargetMonth() {
    return  Math.ceil(+targetAmount.value / (this.budgetMonth - this.expensesMonth)) ;
  }

  getDepositInfo() {
    if (this.deposit) {
      this.depositAmount = depositAmountInput.value;
      if (depositBank.value === 'other') {
        this.depositInterest = depositInterestInput.value;
      } else {
        this.depositInterest = depositBank.value;
      }
    }
  }

  calcSavedMoney() {
    return +periodSelector.value * (this.budgetMonth - this.expensesMonth);
  }

  textFieldsDisabler() {
    textDataFields = document.querySelector('.data').querySelectorAll('input[type=text]');
    textDataFields.forEach((item) => {
      item.setAttribute('readOnly','1');
      item.style.background = 'rgba(255,127,99,.26)';
    });
    calcButton.style.display = 'none';
    plusButtonExpenses.style.display = 'none';
    plusButtonIncome.style.display = 'none';
    cancelButton.style.display = 'block';
    depositBank.setAttribute('disabled','1');
  }

  listeners() {
    calcButton.addEventListener('click', () => this.errorHendler());
    plusButtonIncome.addEventListener('click', this.addIncomeBlock);
    plusButtonExpenses.addEventListener('click', this.addExpensesBlock);
    periodSelector.addEventListener('input', () => this.getPeriod());
    cancelButton.addEventListener('click', () => this.reset());
    depositCheckBox.addEventListener('change', () => this.addDepositBlock());
    depositBank.addEventListener('change', this.addInterestInput);
    depositAmountInput.addEventListener('input', this.depositAmountInputChecker);
    depositInterestInput.addEventListener('input', this.depositInterestInputChecker);
  }
}



const appData = new AppData();
appData.listeners();





