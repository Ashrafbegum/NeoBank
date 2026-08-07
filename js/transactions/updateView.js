import { transactionHistory } from "../../storage/localStorage.js";
import { renderTransactions } from "../../ui/renderTransactions.js";
import { viewState } from "./viewState.js";

export function updateView() {
    let transactions = [...transactionHistory];
    if (viewState.searchTerm !== "") {

        /* some() checks whether at least one element's title or caegory in the array satisfies a condition. */
        transactions = transactions.filter(
            (transaction) =>
            transaction.title
                .toLowerCase()
                .split(" ")
                .some((word) => word.startsWith(viewState.searchTerm)) ||
            transaction.category
                .toLowerCase()
                .split(" ")
                .some((word) => word.startsWith(viewState.searchTerm)),
        );
    }

    if(viewState.filterType !== "all") {
            transactions = transactions.filter((transaction) => transaction.type === viewState.filterType);
    }

    switch (viewState.sortOrder) {
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