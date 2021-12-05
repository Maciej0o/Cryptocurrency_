import axios from 'axios';

export const coinGeckoApi = axios.create({
  baseURL: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false
    `,
  timeout: 2000,
  //   headers: { 'X-Custom-Header': 'foobar', accept: 'application/json' },
});
