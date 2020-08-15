import axios from 'axios';
const URL = "https://api.exchangeratesapi.io/latest";

export const fetchExchangeRates = async (query) => {
    const { data } = await axios.get(URL, {
        params: {
            base: query
        }
    });

    return data;
}