let transactionHistory =  [];

export function saveTransaction(transaction) {
    transactionHistory.push(transaction);
};

export function renderTransactions() {
    const tbody = document.getElementById("transactionTable");

    transactionHistory.forEach((transaction) => {
        tbody.innerHTML = `
            <tr>
                <th>${transaction.title}</th>
                <th>${transaction.category}</th>
                <th>${transaction.date}</th>
                <th>${transaction.amount}</th>
                <th>
                    <button type="button" class="deleteBtn">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </th>
        `;
    });
}