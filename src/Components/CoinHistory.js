import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { PersonFill } from 'react-bootstrap-icons';

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
                info: coinInfo.data,
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
              <h1 class="mt-3 text-capitalize text-center">
                <img src={coinData.info.image.small} class="mx-3 rounded shadow"/>
                {coinData.info.name}
                <h5 class="mt-2 text-muted">
                  A${coinData.price}
                </h5>
              </h1>
              {coinData.info.description.en && <><h2 class="mt-3">What is {coinData.info.name}?</h2>
              <div class="m-3" dangerouslySetInnerHTML={{ __html: coinData.info.description.en }} /></>}
              <Line class="mb-4" options={options} data={coinData} />
              
              {/* socials */}
              <div class="row bg-danger text-white py-2">
                <div class="col d-flex">
                  <div class="row mx-auto my-3 feature-item" onClick={() => window.open(`https://twitter.com/${coinData.info.links.twitter_screen_name}`, '_blank')} style={{cursor:"pointer"}}>
                    <div class="col my-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-twitter" viewBox="0 0 16 16">
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                      </svg>
                    </div>
                    <div class="col">
                      <p class="mb-0">@{coinData.info.links.twitter_screen_name}</p>
                      <p class="mb-0 d-flex align-items-center"><PersonFill/>{coinData.info.community_data.twitter_followers.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div class="col d-flex">
                  <div class="row mx-auto my-3 feature-item" onClick={() => window.open(coinData.info.links.homepage[0], '_blank')} style={{cursor:"pointer"}}>
                    <div class="col my-auto">
                      <img style={{maxHeight:"50px"}} class="shadow rounded" src={coinData.info.image.small}/>
                    </div>
                    <div class="col my-auto">
                      <p class="mb-0">Website</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </>
    );
}