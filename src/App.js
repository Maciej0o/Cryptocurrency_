import './App.css';
import { CoinsTable } from './components/CoinsTable';
import { CoinInfo } from './components/CoinInfo';
import { InfoBar } from './components/InfoBar';
import { NavBar } from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { CoinContext } from './context/CoinContext';
import { useState } from 'react';

function App() {
  const [context, setContext] = useState({
    coin: null,
  });

  const contextValue = {
    coin: context.coin,
    setCoin: (coin) => setContext({ coin }),
  };

  return (
    <Box
      className="App"
      style={{
        height: '100%',
      }}
    >
      <NavBar />
      <InfoBar />
      <Container style={{ padding: 40 }}>
        <CoinContext.Provider value={contextValue}>
          <Routes>
            <Route path="/" element={<CoinsTable />} />
            <Route path="/coin" element={<CoinInfo />} />
          </Routes>
        </CoinContext.Provider>
      </Container>
    </Box>
  );
}

export default App;
