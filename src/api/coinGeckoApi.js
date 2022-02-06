import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

const cache = setupCache({
  maxAge: 30 * 1000,
});

export const coinGeckoApi = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/',
  timeout: 2000,
  //   headers: { 'X-Custom-Header': 'foobar', accept: 'application/json' },
});

export const coinGeckoApiGlobal = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/global',
  timeout: 2000,
  //   headers: { 'X-Custom-Header': 'foobar', accept: 'application/json' },
});
