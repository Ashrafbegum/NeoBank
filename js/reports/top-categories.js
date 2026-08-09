import { transactionHistory } from "../../storage/localStorage.js";

let categoriesChart = null;
export function renderTopCategories() {
  const groupedCategories = groupCategories();

  //sort catgories
  groupedCategories.sort( 
       (a, b) => Number(b.totalAmount) - Number(a.totalAmount),
     );

  const topCategories = groupedCategories.slice(0,5);

  // 1. Get the canvas element context
  const canvas = document.getElementById("categoriesChart").getContext("2d");


  const highestAmount = topCategories[0].totalAmount;
  const stepSize = highestAmount <= 5000 ? 1000 : 5000;

  // Destroy previous chart before creating a new one
  if (categoriesChart) {
    categoriesChart.destroy();
  }

  // 2. Initialize the chart
  categoriesChart = new Chart(canvas, {
    type: "bar",
    data: {
      labels: topCategories.map((category) => category.categoryName), //category on Y-axis
      datasets: [
        {
          label: "Expenditures",
          data: topCategories.map((category) => category.totalAmount), // amount on X-axis
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 2,
          borderRadius: 5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,

      indexAxis: "y",

      plugins: {
        legend: {
          display: false,
        },
      },

      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            stepSize,
          },
        },

        y: {
          grid: {
            display: false,
          },
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