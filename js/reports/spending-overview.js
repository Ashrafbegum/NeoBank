import { transactionHistory } from "../../storage/localStorage.js";

let spendingChart = null;
export function renderSpendingOverview() {
  const groupedCategories = groupCategories();

  // 1. Get the canvas element context
  const canvas = document.getElementById("spendingChart").getContext("2d");

  // Destroy previous chart before creating a new one
  if (spendingChart) {
    spendingChart.destroy();
  }

  // 2. Initialize the chart
  spendingChart = new Chart(canvas, {
    type: "doughnut",
    data: {
      labels: groupedCategories.map((category) => category.categoryName), //category on Y-axis
      datasets: [
        {
          label: "Expenditures",
          data: groupedCategories.map((category) => category.totalAmount), // amount on X-axis
          backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"],
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          position: "left",
        },
      },
    },
  });
}

 function groupCategories() {
   const expenseTransactions = transactionHistory.filter(
     (transaction) => transaction.type === "expense",
   );

   const groupedByCategory = Object.groupBy( expenseTransactions, (transaction) => transaction.category,
   );

   const categoryTotals = Object.entries(groupedByCategory).map(
     ([category, list]) => {
       const totalAmount = list.reduce((sum, item) => sum + item.amount, 0);

       return {
         categoryName: category,
         totalAmount,
         count: list.length,
       };
     },
   );

   return categoryTotals;
 }