import { transactionHistory } from "../storage/localStorage.js";

/* default parameter is transactionHistory */
export function renderTransactions(transactions = transactionHistory) {
  const tbody = document.getElementById("transactionTable");
  const emptyState = document.getElementById("emptyState");

  tbody.innerHTML = "";

  if (transactions.length === 0) {
    tbody.innerHTML = `
        <tr>
        <td colspan="5">
            <div class="empty-message">
                 No transactions available
            </div>
        </td>
        </tr>
    `;
    return;
  }

  transactions.forEach((transaction) => {
    const formattedDate = formatDate(transaction.date);
    
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
                <td>${transaction.title}</td>
                <td>${transaction.type}</td>
                <td>${transaction.category}</td>
                <td>${formattedDate}</td>
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

function formatDate(date) {
    /* Format date since objects in LoaclStorage are stored as JSON Strings */
    const formattedDate = new Date(date).toLocaleDateString("en-GB");

    return(formattedDate);
}