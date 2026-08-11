import { transactionHistory } from "../../storage/localStorage.js";

let incomeExpenseChart = null;

export function renderIncomeExpenseChart() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const incomeByMonth = new Array(12).fill(0);
  const expenseByMonth = new Array(12).fill(0);

  transactionHistory.forEach((transaction) => {
    const month = new Date(transaction.date).getMonth();

    if (transaction.type === "income") {
      incomeByMonth[month] += transaction.amount;
    }

    if (transaction.type === "expense") {
      expenseByMonth[month] += transaction.amount;
    }
  });

  // 1. Get the canvas element context
  const canvas = document.getElementById("incomeExpenseChart").getContext("2d");

  // Destroy previous chart before creating a new one
  if (incomeExpenseChart) {
    incomeExpenseChart.destroy();
  }

  // 2. Initialize the chart
  incomeExpenseChart = new Chart(canvas, {
    type: "bar",

    data: {
      labels: months, //X-axis

      datasets: [
        //Y-axis
        {
          label: "Income",
          data: incomeByMonth,
        },
        {
          label: "Expense",
          data: expenseByMonth,
        },
      ],
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          position: "top",
        },
      },

      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 10000,
          },
          grid: {
            display: false,
          },
        },
      },
    },
  });
}
