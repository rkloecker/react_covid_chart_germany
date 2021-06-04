import "./App.css";
import { Line } from "react-chartjs-2";
import useFetch from "./useFetch";

function App() {
  const { error, isPending, data } = useFetch(
    "https://api.corona-zahlen.org/germany/history/incidence"
  );

  const options = {
    title: {
      display: true,
      text: "Line Chart",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 10,
            stepSize: 1,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            min: 0,
            max: 50,
            stepSize: 10,
          },
        },
      ],
    },
  };

  return (
    <div className="App">
      <div className="chart">
        {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        {data && <Line data={data} options={options} />}
      </div>
    </div>
  );
}

export default App;
