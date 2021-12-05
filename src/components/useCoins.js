import { useState, useCallback } from 'react';
import { coinGeckoApi } from '../api';

export const useCoins = () => {
  const [coins, setCoins] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCoinGecko = useCallback(async () => {
    setLoading(true);
    try {
      const res = await Promise.all([coinGeckoApi.get('', {})]);
      setCoins(res[0].data);
    } catch (e) {
      console.error('Error while fetching current weather', e);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    coins,
    loading,
    fetchCoinGecko,
  };
};
