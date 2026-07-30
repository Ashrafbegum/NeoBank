let transactionHistory =  [];

export function loadDataFromLocalStorage() {
    transactionHistory = JSON.parse(localStorage.getItem("Transaction-History")) || [];
};

export function saveTransaction(transaction) {
    transactionHistory.push(transaction);
    localStorage.setItem("Transaction-History", JSON.stringify(transactionHistory));
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
                    <button type="button" id="deleteBtn">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </td>
        `;
        tbody.appendChild(newRow);
    });
}
