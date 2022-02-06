import { useState, useCallback } from 'react';
import { coinGeckoApi } from '../api';

export const useHistoryPrices = () => {
  const [historyPrices, setHistoryPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistoryPrices = useCallback(async ({ id = null }) => {
    setLoading(true);
    let URL = `coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`;
    try {
      const res = await coinGeckoApi.get(URL, {});
      setHistoryPrices(res.data.prices);
    } catch (e) {
      console.error('Error while fetching current weather', e);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    historyPrices,
    loading,
    fetchHistoryPrices,
  };
};
