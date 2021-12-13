import { useState, useCallback } from 'react';
import { coinGeckoApiCoins, coinGeckoApiGlobal } from '../api';

export const useCoins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [global, setGlobal] = useState([]);

  const fetchCoinGecko = useCallback(
    async (id = null, page = 0, rowsPerPage = 50) => {
      setLoading(true);
      let URL = `markets?vs_currency=usd&order=market_cap_desc&per_page=${rowsPerPage}&page=${
        page + 1
      }&sparkline=false`;
      if (id) {
        URL += '&ids=' + id;
      }
      try {
        const [res, res1] = await Promise.all([
          coinGeckoApiCoins.get(URL, {}),
          coinGeckoApiGlobal.get('', {}),
        ]);
        setCoins(res.data);
        setGlobal(res1.data.data);
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
    global,
    loading,
    fetchCoinGecko,
  };
};
