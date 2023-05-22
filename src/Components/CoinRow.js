import React from 'react';
import { ArrowUp, ArrowDown } from 'react-bootstrap-icons';

export default function CoinRow({coin}) {
    
    return (
        <tr onClick={() => window.location=`/history/${coin.id}`} style={{cursor: "pointer"}}>
            <td><img src={coin.image} style={{maxWidth:"40px"}}/></td>
            <td>
                {coin.name}
                <br/>
                <p className="text-muted text-uppercase mb-0">{coin.symbol}</p>
            </td>
            <td>
                ${coin.current_price.toLocaleString()}
                <br/>
                <p className="text-muted mb-0">AUD</p>
            </td>
            <td>
                {
                    (coin.price_change_percentage_24h > 0) ? 
                    <ArrowUp className="m-2" color="green" size={20} /> :
                    <ArrowDown className="m-2" color="red" size={20} />
                }
                {coin.price_change_percentage_24h.toFixed(2)}%
            </td>
            {/* 
            <td>
                <button className="btn btn-primary">Buy {coin.symbol.toUpperCase()}</button>
                <button className="btn btn-light m-1">Sell {coin.symbol.toUpperCase()}</button>
            </td>
            */}
        </tr>
    )
}