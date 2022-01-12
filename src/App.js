import './App.css';
import { CoinsTable } from './components/CoinsTable';
import { CoinInfo } from './components/CoinInfo';
import { InfoBar } from './components/InfoBar';
import { NavBar } from './components/NavBar';
import { Transactions } from './components/Transactions';
import { Portfolio } from './components/Portfolio';
import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { TransactionsContext } from './context/TransactionsContext';
import { useState } from 'react';

import { loadFromLs } from './utils/localstorage';

function App() {
  const [context, setContext] = useState({
    transactions: loadFromLs(),
    valuePortfolio: 0,
  });

  const contextValue = {
    transactions: context.transactions,
    valuePortfolio: context.valuePortfolio,
    setTransactions: (transactions) =>
      setContext({ ...context, transactions }),
    setValuePortfolio: (valuePortfolio) =>
      setContext({ ...context, valuePortfolio }),
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
        <TransactionsContext.Provider value={contextValue}>
          <Routes>
            <Route path="/" element={<CoinsTable />} />
            <Route path="/coin" element={<CoinInfo />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </TransactionsContext.Provider>
      </Container>
    </Box>
  );
}

export default App;
