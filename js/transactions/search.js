import { renderTransactions } from "../../ui/renderTransactions.js"
 import { transactionHistory } from "../../storage/localStorage.js";

export function handleSearch(event){
  const searchTerm = event.target.value.toLowerCase().trim();

  // If search box is empty, show all transactions
  if (!searchTerm) {
    renderTransactions();
    return;
  }

  /* some() checks whether at least one element in the array satisfies a condition. */
  let filteredTransactions = transactionHistory.filter(
    (transaction) =>
      transaction.title
        .toLowerCase()
        .split(" ")
        .some((word) => word.startsWith(searchTerm)) ||
      transaction.category
        .toLowerCase()
        .split(" ")
        .some((word) => word.startsWith(searchTerm)),
  );

  renderTransactions(filteredTransactions);
};