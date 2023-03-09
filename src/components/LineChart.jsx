import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  const maxDataLength = 150;
  const length = coinHistory?.data?.history?.length;
  const step = Math.ceil(length / maxDataLength);
  for (let i = 0; i < length; i += step) {
    coinPrice.push(coinHistory.data.history[i].price);
    coinTimestamp.push("");
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice.reverse(),
        fill: false,
        backgroundColor: "#ffba04",
        borderColor: "#ffba04",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          color: "#66686e40",
        },
      },
      y: {
        grid: {
          color: "#66686e60",
        },
        ticks: {
          color: "#fff",
        },
      },
    },
    plugins: {
      legend: false,
    },
    maintainAspectRatio: false,
  };

  return (
    <>
      <div className="chart-header">
        <div className="chart-header__title">
          {coinName} price chart (in USD)
        </div>
        <div className="chart-header__price-container">
          <span className="chart-header__change">
            Price change:
            <span>{coinHistory?.data?.change}%</span>
          </span>
          <span className="chart-header__price">
            Current price:<span>${currentPrice}</span>
          </span>
        </div>
      </div>
      <div className="line-wrapper">
        <Line data={data} options={options} className="line" />
      </div>
    </>
  );
};

export default LineChart;
