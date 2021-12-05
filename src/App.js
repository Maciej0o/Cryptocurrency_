import './App.css';
import { CoinsTable } from './components/CoinsTable';
import { CoinInfo } from './components/CoinInfo';
import { NavBar } from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { CoinContext } from './context/CoinContext';
import { useState, useEffect } from 'react';
import { useCoins } from './components/useCoins';

function App() {
  const [context, setContext] = useState({
    coin: null,
  });

  const contextValue = {
    coin: context.coin,
    setCoin: (coin) => setContext({ coin }),
  };

  const { coins, loading, fetchCoinGecko } = useCoins();

  useEffect(() => {
    fetchCoinGecko();
  }, [fetchCoinGecko]);

  return (
    <Box
      className="App"
      style={{
        height: '100%',
      }}
    >
      <NavBar />
      <Container style={{ padding: 40 }}>
        {loading ? (
          <Box>
            <CircularProgress />
          </Box>
        ) : (
          <CoinContext.Provider value={contextValue}>
            <Routes>
              <Route
                path="/"
                element={<CoinsTable coins={coins} />}
              />
              <Route
                path="/coin"
                element={<CoinInfo coins={coins} />}
              />
            </Routes>
          </CoinContext.Provider>
        )}
      </Container>
    </Box>
  );
}

export default App;
