import { useState, useCallback } from 'react';
import { coinGeckoApiGlobal } from '../api';

export const useGlobalInfo = () => {
  const [loading, setLoading] = useState(true);
  const [global, setGlobal] = useState([]);

  const fetchGlobalInfo = useCallback(async () => {
    setLoading(true);

    try {
      const [res] = await Promise.all([
        coinGeckoApiGlobal.get('', {}),
      ]);
      setGlobal(res.data.data);
    } catch (e) {
      console.error('Error while fetching current weather', e);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    global,
    loading,
    fetchGlobalInfo,
  };
};
