import { transactionHistory } from "../storage/localStorage.js";

export let currentBalance = 0;
export let totalSavings = 0;

let totalIncome = 0;
let totalExpenses = 0;

export function calculateStatistics() {
  // get all income transactions
  const incomes = transactionHistory.filter(
    (transaction) => transaction.type === "income",
  );

  // get all expenses transactions
  const expenses = transactionHistory.filter(
    (transaction) => transaction.type === "expense",
  );

  // get all transfers to savings transactions: Checking → Savings
  const transfersToSavings = transactionHistory.filter(
    (transaction) =>
      transaction.type === "transfer" && transaction.category === "Savings",
  );

  // get all transfers from Savings transactions: Savings → Checking
  const transfersFromSavings = transactionHistory.filter(
    (transaction) =>
      transaction.type === "transfer" && transaction.category === "Checking",
  );

  // get all other transfer transactions: Checking → Credit Card Payment / Internal Transfer / External Transfer
  const otherTransfersOut = transactionHistory.filter(
    (transaction) =>
      transaction.type === "transfer" &&
      [
        "Credit Card Payment",
        "Internal Transfer",
        "External Transfer",
      ].includes(transaction.category),
  );

  // sum of all incomes
  totalIncome = incomes.reduce(
    (sum, transaction) => sum + transaction.amount,
    0,
  );

  // sum of all expenses
  totalExpenses = expenses.reduce(
    (sum, transaction) => sum + transaction.amount,
    0,
  );

   // sum of all transfers to savings: Checking → Savings
  const savingsIn = transfersToSavings.reduce(
    (sum, transaction) => sum + transaction.amount,
    0,
  );

  // sum of all transfers from Savings: Savings → Checking
  const savingsOut = transfersFromSavings.reduce(
    (sum, transaction) => sum + transaction.amount,
    0,
  );

  // sum of all other transfers: Checking → Credit Card Payment / Internal Transfer / External Transfer
  const otherTransfers = otherTransfersOut.reduce(
    (sum, transaction) => sum + transaction.amount,
    0,
  );

  // Total Savings is the amount of money currently held in the Savings account, after accounting for money transferred into or out of Savings.

  totalSavings = savingsIn - savingsOut;

  // Current Checking Balance is the amount of money currently available in the Checking account, after accounting for all income, expenses, and transfers in or out of Checking.

  currentBalance =
    totalIncome - totalExpenses - savingsIn - otherTransfers + savingsOut;
}

export function renderStatistics() {
  calculateStatistics();

  const balance = document.getElementById("balance");
  const income = document.getElementById("income");
  const expense = document.getElementById("expense");
  const saving = document.getElementById("saving");

  balance.textContent = formatAmount(currentBalance);
  income.textContent = formatAmount(totalIncome);
  expense.textContent = formatAmount(totalExpenses);
  saving.textContent = formatAmount(totalSavings);
}

function formatAmount(amount) {
  return currencyFormatter.format(amount);
}

// Australian English format - Amount comma separated
const currencyFormatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  currencyDisplay: "narrowSymbol",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

