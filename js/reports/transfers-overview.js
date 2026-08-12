import { transactionHistory } from "../../storage/localStorage.js";

let transfersChart = null;
export function renderTransfersOverview() {
  const groupedCategories = groupTransfers();

  // 1. Get the canvas element context
  const canvas = document.getElementById("transfersChart").getContext("2d");

  // Destroy previous chart before creating a new one
  if (transfersChart) {
    transfersChart.destroy();
  }

  // 2. Initialize the chart
  transfersChart = new Chart(canvas, {
    type: "pie",
    data: {
      labels: groupedCategories.map((category) => category.categoryName), //category on Y-axis
      datasets: [
        {
          label: "Transfers",
          data: groupedCategories.map((category) => category.totalAmount), // amount on X-axis
          backgroundColor: [
            "#ff6384",
            "#36a2eb",
            "#ffce56",
            "#4bc0c0",
            "#9966ff",
          ],
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 2,
        },
      ],
    },

    /* register to use datalabels plugin in chart, ChartDataLabels is object of plugins property*/
    plugins: [ChartDataLabels],

    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          position: "right",
        },

        datalabels: {
          color: "#fff",
          font: {
            weight: "bold",
          },

          formatter: (value, context) => {

            const data = context.chart.data.datasets[0].data;

            const total = data.reduce((sum, value) => sum + value, 0);

            const percentage = (value / total) * 100;

            return `${percentage.toFixed(0)}%`;
          },
        },
      },
    },
  });
}

function groupTransfers() {
  const transferTransactions = transactionHistory.filter(
    (transaction) => transaction.type === "transfer",
  );

  const groupedByCategory = Object.groupBy(
    transferTransactions,
    (transaction) => transaction.category,
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