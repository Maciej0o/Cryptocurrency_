import axios from 'axios';

export const coinGeckoApi = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/coins/',
  timeout: 2000,
  //   headers: { 'X-Custom-Header': 'foobar', accept: 'application/json' },
});
