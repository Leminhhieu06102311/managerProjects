const chartMonth = document.getElementById("chart__month-canvas");
const chartProfit = document.getElementById("chart__profit-canvas");

const data = [
  { year: 2010, count: 10 },
  { year: 2011, count: 20 },
  { year: 2012, count: 15 },
  { year: 2013, count: 25 },
  { year: 2014, count: 22 },
  { year: 2015, count: 30 },
  { year: 2016, count: 28 },
  { year: 2010, count: 10 },
  { year: 2011, count: 20 },
  { year: 2012, count: 15 },
  { year: 2013, count: 25 },
  { year: 2014, count: 22 },
  { year: 2015, count: 30 },
  { year: 2016, count: 28 },
  { year: 2010, count: 10 },
  { year: 2011, count: 20 },
  { year: 2012, count: 15 },
  { year: 2013, count: 25 },
  { year: 2014, count: 22 },
  { year: 2015, count: 30 },
  { year: 2016, count: 28 },
];
new Chart(chartMonth, {
  type: "bar",
  data: {
    labels: data.map((row) => row.year),
    datasets: [
      {
        label: "Total",
        data: data.map((row) => row.count),
        borderWidth: 1,
        backgroundColor: "#8231d3",
        borderColor: "#8231d3",
        borderWidth: 5,
      },
    ],
  },
  options: {
    animations: {
      tension: {
        duration: 2000,
        easing: "linear",
        from: 1,
        to: 0,
        loop: true,
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          // This more specific font property overrides the global property
          font: {
            size: 25,
          },
        },
      },
    },
  },
});
new Chart(chartProfit, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [3233, 5000, 5000],
        backgroundColor: [
          "rgba(1, 184, 26, 1)",
          "rgb(255, 15, 15)",
          "rgba(250, 139, 12, 1)",
        ],
        hoverOffset: 10,
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  },
});
