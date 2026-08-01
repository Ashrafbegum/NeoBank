import { renderTransactions } from "../../ui/renderTransactions.js"
 import { transactionHistory } from "../../storage/localStorage.js";

export function handleSearch(event){
    const searchTerm = event.target.value.toLowerCase().trim();
    console.log(searchTerm);
    const filteredTransactions = transactionHistory.filter(transaction => 
          transaction.title.toLowerCase().includes(searchTerm) ||
          transaction.category.toLowerCase().includes(searchTerm)
    );      
    renderTransactions(filteredTransactions);
};