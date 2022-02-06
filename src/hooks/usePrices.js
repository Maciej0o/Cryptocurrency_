import { useState, useCallback } from 'react';
import { coinGeckoApi } from '../api';

export const parseData = (data) => {
  return Object.entries(data).reduce((prev, [key, value]) => {
    prev[key] = value.usd;
    return prev;
  }, {});
};

export const usePrices = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPrices = useCallback(async ({ ids }) => {
    setLoading(true);
    let URL = `simple/price?ids=${ids}&vs_currencies=usd`;
    try {
      const res = await coinGeckoApi.get(URL, {});
      const { data } = res;
      // musimy sie pozbyc z value {usd: 100} zeby bylo samo 100
      const parsedData = parseData(data);
      setPrices(parsedData);
    } catch (e) {
      console.error('Error while fetching current weather', e);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    prices,
    loading,
    fetchPrices,
  };
};
