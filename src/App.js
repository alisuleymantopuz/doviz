import React, { useState } from 'react';
import { fetchExchangeRates } from './api/fetchExchangeRates';
import './App.css'

const App = () => {

    const [query, setQuery] = useState('');
    const [exchangeRates, setExchangeRates] = useState({});

    const search = async (e) => {
        if (e.key === 'Enter') {
            const data = await fetchExchangeRates(query);
            setExchangeRates(data);
            setQuery('');
        }
    }

    return (
        <div className="main">
            <input
                type="text"
                className="search"
                placeholder="Search... (type the currency code such as EUR, USD, TRY)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={search} />
            {exchangeRates.rates && (
                <div className="container">
                    {
                        Object.keys(exchangeRates.rates).map((key, index) => (
                            <div className="card">
                                <div className="card-rate-title">
                                    {exchangeRates.rates[key]} <i className="red">{key}</i>
                                </div>
                            </div>
                        ))
                    }
                </div>
            )}
        </div>
    );
}

export default App;