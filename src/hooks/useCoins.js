import { useState, useCallback } from 'react';
import { coinGeckoApi } from '../api';

export const useCoins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCoinGecko = useCallback(
    async (id = null, page = null) => {
      setLoading(true);
      let URL =
        'markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false';
      if (id) {
        URL += '&ids=' + id;
      }
      try {
        const res = await coinGeckoApi.get(URL, {});
        setCoins(res.data);
      } catch (e) {
        console.error('Error while fetching current weather', e);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    coins,
    loading,
    fetchCoinGecko,
  };
};
