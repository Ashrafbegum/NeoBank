import { renderTransactions } from "../ui/renderTransactions.js";

export let transactionHistory = [];

export function loadDataFromLocalStorage() {
  transactionHistory =
    JSON.parse(localStorage.getItem("Transaction-History")) || [];
}

export function saveDataToLocalStorage() {
  localStorage.setItem("Transaction-History", JSON.stringify(transactionHistory));
}

export function saveTransaction(transaction) {
  transactionHistory.push(transaction);
  saveDataToLocalStorage();
}

export function deleteTransaction(id) {
    const index = transactionHistory.findIndex(transaction => transaction.id === id);
    if( index > -1) {  // Means transaction found
        transactionHistory.splice(index, 1);  // delete transaction
    }
    
    saveDataToLocalStorage();
};
