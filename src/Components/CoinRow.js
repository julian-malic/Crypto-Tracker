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
                ${(coin.current_price) ? coin.current_price.toLocaleString() : 0}
                <br/>
                <p className="text-muted mb-0">AUD</p>
            </td>
            <td>
                {
                    (coin.price_change_percentage_24h > 0) ? 
                    <ArrowUp className="m-2" color="green" size={20} /> :
                    <ArrowDown className="m-2" color="red" size={20} />
                }
                {(coin.price_change_percentage_24h) ? coin.price_change_percentage_24h.toFixed(2) : 0}%
            </td>
        </tr>
    )
}