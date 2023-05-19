import React, { useState, useEffect } from 'react';
import CoinRow from './CoinRow';
import axios from 'axios';
import { Search } from 'react-bootstrap-icons';

export default function CoinTable() {

    const [coins, setCoins] = useState(null);
    const [filteredCoins, setFilteredCoins] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const sortingFilters = ["Market cap ↑", "Market cap ↓"];

    useEffect(() => {
        // api is rate limited so I have to get the data in larger chunks to minimise the amount of calls I make...
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=1&sparkline=false`) // get 100 coins then I'll do pagination client-side..
        .then((res) => {
            console.log(res.data);
            setCoins(res.data);
            setFilteredCoins(res.data.slice(0, 10)); // first page
        });
    }, []);

    function handleNextPage() {
        setPageNumber((page) => page += 1);
        setFilteredCoins(coins.slice((pageNumber-1)*10, pageNumber*10)); // change page
    }

    function handlePrevPage() {
        setPageNumber((page) => page -= 1);
        setFilteredCoins(coins.slice((pageNumber-1)*10, pageNumber*10));
    }

    function handleSearchText(e) {
        if (!e.target.value) {
            setFilteredCoins(coins.slice((pageNumber-1)*10, pageNumber*10));
        } else {
            setFilteredCoins(
                coins.filter(coin => {
                    if (coin.name.toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1 ||
                        coin.symbol.toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1) {
                        console.log(coin.name);
                        return true;
                    } else { return false; }
                })
            );
        }
        console.log(e.target.value);
    }

    if (!filteredCoins) {
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
                <select required className="form-control" name="sortFilter" id="dropdownSortFilter" >
                    {sortingFilters.map((filter) => <option value={filter}>{filter}</option>)}
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
                    {filteredCoins.map((coin) => {
                        return <CoinRow coin={coin}/>
                    })}
                </tbody>
            </table>
            <div class="row text-center my-3">
                {(pageNumber > 1) ? <div class="col">
                    <button class="btn btn-danger" onClick={handlePrevPage}>Previous page</button>
                </div> : null}
                {(pageNumber < coins.length / 10) ? <div class="col">
                    <button class="btn btn-danger" onClick={handleNextPage}>Next page</button>
                </div> : null}
            </div>
        </div>
    )
}