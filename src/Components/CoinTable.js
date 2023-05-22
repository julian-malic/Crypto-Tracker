import React, { useState, useEffect } from 'react';
import CoinRow from './CoinRow';
import axios from 'axios';
import { Search } from 'react-bootstrap-icons';

export default function CoinTable() {

    const [coins, setCoins] = useState(null);
    const [filteredCoins, setFilteredCoins] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const [error, setError] = useState(null);
    const [sortingFilter, setSortingFilter] = useState("market_cap_desc");
    
    const sortingFilters = [["market_cap_desc", "Market cap ↓"], ["market_cap_asc", "Market cap ↑"], ["volume_desc", "Volume ↓"], ["volume_asc", "Volume ↑"], ["id_desc", "Name ↓"], ["id_desc", "Name ↑"]];

    useEffect(() => {
        // I would add pagination but the api rate limits me :(
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=${sortingFilter}&per_page=250&page=1&sparkline=false`) // get 250 coins on one page to prevent rate limit...
        .then((res) => {
            console.log(res);
            setCoins(res.data);
            setFilteredCoins(res.data); // first page
        })
        .catch(() => {
            setError("Rate limit exceeded, please wait a few minutes before refreshing the page.");
        });
    }, [sortingFilter]);

    function handleSortingFilter(e) { setCoins(null); setSortingFilter(e.target.value); }

    function handleSearchText(e) {
        setFilteredCoins(
            coins.filter(coin => {
                if (coin.name.toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1 ||
                    coin.symbol.toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1) {
                    console.log(coin.name);
                    return true;
                } else { return false; }
            })
        );
        console.log(e.target.value);
    }

    if (error) {
        return (
            <div class="row shadow rounded feature-item mt-5 mx-auto table-responsive border border-danger">
                <div class="text-center mt-4 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-emoji-frown mb-4" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
                    </svg>
                    <h2>{error}</h2>
                </div>
            </div>
        )
    }

    if (!coins || !filteredCoins) {
        return null;
    }

    return (
        <div class="row shadow rounded feature-item mt-5 mx-auto table-responsive border border-danger">
            <div class="d-flex justify-content-center mt-4 mb-4">
                <input class="rounded border border-danger" placeholder="Search for a coin!" onChange={handleSearchText}/>
                <Search class="mx-2 text-danger my-auto"/>
            </div>
            <div className="form-group p-3">
                <label for="dropdownSortFilter">Sort by</label> {/* required field */}
                <select required className="form-control" name="sortFilter" id="dropdownSortFilter" onChange={handleSortingFilter}>
                    {sortingFilters.map((filter) => <option value={filter[0]}>{filter[1]}</option>)}
                </select>
            </div>
            <table class="table text-center table-hover">
                <thead>
                    <tr>
                        <th scope="col">Coin</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Price change (24h)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (showAll)
                        ? filteredCoins.map((coin) => { return <CoinRow coin={coin}/> })
                        : filteredCoins.slice(0, 10).map((coin) => { return <CoinRow coin={coin}/> })
                    }
                </tbody>
            </table>
            {   
                (filteredCoins.length > 10 && !showAll)
                ? <div class="text-center"><button class="btn btn-danger my-4" onClick={() => setShowAll(true)}>Show {filteredCoins.length - 10} more</button></div>
                : null
            }
        </div>
    )
}