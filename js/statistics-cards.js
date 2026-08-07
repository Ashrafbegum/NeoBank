import { transactionHistory } from "../storage/localStorage.js";

    let currentBalance = 0;
    let totalIncome = 0;
    let totalExpenses = 0;
    let totalSavings = 0;

export function calculateStatistics() {
   
    const incomes = transactionHistory.filter((transaction) => transaction.type === "income");
    const expenses = transactionHistory.filter((transaction) => transaction.type === "expense");

    const transfersIn = transactionHistory.filter(
      (transaction) =>
        transaction.type === "transfer" && transaction.category === "Savings"
    );
    
    const transfersOut = transactionHistory.filter(
      (transaction) =>
        transaction.type === "transfer" && transaction.category !== "Savings"
    );      

    totalIncome = incomes.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );

    totalExpenses = expenses.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );

    const savingsIn = transfersIn.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );

     const savingsOut = transfersOut.reduce(
       (sum, transaction) => sum + transaction.amount,
       0,
     );

    totalSavings = savingsIn - savingsOut; 

    currentBalance = totalIncome - totalExpenses;

};

export function renderStatistics() {
  calculateStatistics();

  let balance = document.getElementById("balance");
  let income = document.getElementById("income");
  let expense = document.getElementById("expense");
  let saving = document.getElementById("saving");

  balance.textContent = formatAmount(currentBalance);
  income.textContent = formatAmount(totalIncome);
  expense.textContent = formatAmount(totalExpenses);
  saving.textContent = formatAmount(totalSavings);

};

function formatAmount(amount) {
  return currencyFormatter.format(amount); //e.g.; $1,234.50
}

  // Australian English format - Amount comma seperated  (e.g.; 1,234,567.89)
const currencyFormatter = new Intl.NumberFormat("en-AU", {  // creates a formatter object
    style: "currency",
    currency: "AUD",
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

