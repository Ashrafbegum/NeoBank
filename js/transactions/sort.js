import { transactionHistory } from "../../storage/localStorage.js";
import { renderTransactions } from "../../ui/renderTransactions.js";

export function handleSort() {

    const sortSelect = document.getElementById("sortSelect");

    /* Create a copy of historyTransactions because sort modifies it */
    let sortedTransactions = [...transactionHistory];

    const sortOrder = sortSelect.value;

    switch (sortOrder) {
      case "Oldest First":
        sortedTransactions = sortedTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;

      case "Newest First":
        sortedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;

      case "Lowest Amount":
        sortedTransactions.sort((a, b) => Number(a.amount) - Number(b.amount));
        break;

      case "Highest Amount":
        sortedTransactions.sort((a, b) => Number(b.amount) - Number(a.amount));
        break;

    }
   
    renderTransactions(sortedTransactions);
}