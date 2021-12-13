import axios from 'axios';

export const coinGeckoApiCoins = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/coins/',
  timeout: 2000,
  //   headers: { 'X-Custom-Header': 'foobar', accept: 'application/json' },
});

export const coinGeckoApiGlobal = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/global',
  timeout: 2000,
  //   headers: { 'X-Custom-Header': 'foobar', accept: 'application/json' },
});
