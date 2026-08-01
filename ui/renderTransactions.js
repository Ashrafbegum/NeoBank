import { transactionHistory } from "../storage/localStorage.js";

/* default parameter is transactionHistory */
export function renderTransactions(transactions = transactionHistory) {
    console.log("render");
  const tbody = document.getElementById("transactionTable");

  tbody.innerHTML = "";
  transactions.forEach((transaction) => {
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
                <td>${transaction.title}</td>
                <td>${transaction.category}</td>
                <td>${transaction.date}</td>
                <td>${transaction.amount}</td>
                <td>
                    <button type="button" id="deleteBtn" data-id=${transaction.id} class="delete-btn">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </td>
        `;
    tbody.appendChild(newRow);
  });
}