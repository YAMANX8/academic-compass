import { Doughnut } from "react-chartjs-2";
import ChartJs from "chart.js/auto";

function Chart({ chartData }) {
  return (
    <div>
      <Doughnut
        data={chartData}
        options={{
          animation: {
            duration: 2000,
            easing: "easeInOutBack",
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
            },
          },
        }}
      />
    </div>
  );
}

export default Chart;
