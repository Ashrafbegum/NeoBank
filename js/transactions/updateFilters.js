import { transactionHistory } from "../../storage/localStorage.js";
import { renderTransactions } from "../../ui/renderTransactions.js";
import { filtersState } from "./filtersState.js";

export function updateFilters() {
    let transactions = [...transactionHistory];
    if (filtersState.searchTerm !== "") {

        /* some() checks whether at least one element's title or caegory in the array satisfies a condition. */
        transactions = transactions.filter(
            (transaction) =>
            transaction.title
                .toLowerCase()
                .split(" ")
                .some((word) => word.startsWith(filtersState.searchTerm)) ||
            transaction.category
                .toLowerCase()
                .split(" ")
                .some((word) => word.startsWith(filtersState.searchTerm)),
        );
    }

    if(filtersState.filterType !== "all") {
            transactions = transactions.filter((transaction) => transaction.type === filtersState.filterType);
    }

    switch (filtersState.sortOrder) {
          case "Oldest First":
            /* sort() changes the transactions array */
            transactions.sort(
              (a, b) => new Date(a.date) - new Date(b.date),
            );
            break;

          case "Lowest Amount":
            transactions.sort(
              (a, b) => Number(a.amount) - Number(b.amount),
            );
            break;

          case "Highest Amount":
            transactions.sort(
              (a, b) => Number(b.amount) - Number(a.amount),
            );
            break;

          case "Newest First":
          default:
            transactions.sort(
              (a, b) => new Date(b.date) - new Date(a.date),
            );
            break;
    }
    
    renderTransactions(transactions);
}