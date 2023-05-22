import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Price this week',
      },
    },
  };

export default function CoinHistory() {
    let { id } = useParams();
    const [coinData, setCoinData] = useState(null);

    useEffect(() => {
      if (!coinData) {
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=aud&days=7&interval=daily`)
        .then((coinHistory) => {
            console.log(coinHistory.data);

            axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
            .then((coinInfo) => {
              console.log(coinInfo.data);
              const labels = coinHistory.data.prices.map((price) => { return new Date(price[0]).toLocaleString().slice(0, 10); })
              const current_price = coinInfo.data.market_data.current_price.aud;
              setCoinData({
                labels,
                description: coinInfo.data.description.en,
                image: coinInfo.data.image.small,
                id: coinInfo.data.id,
                name: coinInfo.data.name,
                price: (current_price < 1) ? current_price : current_price.toLocaleString(),
                datasets: [{
                  label: `${id.toUpperCase()} Price (AUD)`,
                  data: coinHistory.data.prices.map((val) => { return val[1] }),
                  borderColor: 'rgb(53, 162, 235)',
                  backgroundColor: 'rgba(53, 162, 235, 0.5)',
                }]
              });
            });
        });
      }
    });

    if (!coinData) {
        return null;
    }

    return (
      <>
        <div class="row">
            <div class="col shadow rounded mb-5">
              <h1 class="mt-3 text-capitalize text-center"><img src={coinData.image} class="mx-3"/>{coinData.name}<h4 class="text-muted">AUD ${coinData.price}</h4></h1>
              <h2 class="mt-5 tex">What is {coinData.name}?</h2>
              <div class="m-3" dangerouslySetInnerHTML={{ __html: coinData.description }} />
              <Line class="mb-4" options={options} data={coinData} />
            </div>
        </div>
      </>
    );
}