import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Trending() {

    const [trendingCoins, setTrendingCoins] = useState(null);

    useEffect(() => {
        if (!trendingCoins) {
            axios.get(`https://api.coingecko.com/api/v3/search/trending`)
            .then((res) => {
                console.log(res.data);
                setTrendingCoins(res.data.coins);
                console.log()
            });
        }
    });

    if (!trendingCoins) {
        return null;
    }

    return (
        <div className="row justify-content-center text-center m-3">
            {trendingCoins.map((coin) => {
                console.log(coin);
                return (
                    <div className="col rounded shadow feature-item m-2 border border-danger" style={{cursor: "pointer"}} onClick={() => { window.location = `/coin/${coin.item.id}`}}>
                        <img className="mt-2" src={coin.item.large} style={{maxWidth:"50px"}}/>
                        <br/>
                        <p className="mb-0 mt-2">{coin.item.name}</p>
                        <p className="text-muted text-uppercase mb-0">{coin.item.symbol}</p>
                        <p className="mb-2 mt-2"><strong>#{coin.item.score+1} Trending 🔥</strong></p>
                    </div>
                );
            })}
        </div>
    );
}