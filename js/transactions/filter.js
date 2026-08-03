import { transactionHistory } from "../../storage/localStorage.js";
import { renderTransactions } from "../../ui/renderTransactions.js";

export function handleFilter() {
  const filterSelect = document.getElementById("filterSelect");

  const filterType = filterSelect.value;
  let filteredTransactions = [];

  switch (filterType) {
    case "All":
      filteredTransactions = transactionHistory;
      break;

    case "Income":
      filteredTransactions = transactionHistory.filter((transaction) => transaction.type === "income");
      break;

    case "Expense":
      filteredTransactions = transactionHistory.filter((transaction) => transaction.type === "expense");
      break;

    case "Transfer":
      filteredTransactions = transactionHistory.filter((transaction) => transaction.type === "transfer");
      break;
  }

  renderTransactions(filteredTransactions);
}
