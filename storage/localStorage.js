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
    if( index > -1) {
        transactionHistory.splice(index, 1);
    }
            saveDataToLocalStorage();
            renderTransactions();
};

export function renderTransactions() {
  const tbody = document.getElementById("transactionTable");

  tbody.innerHTML = "";
  transactionHistory.forEach((transaction) => {
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

