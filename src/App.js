import './App.css';
import { CoinsTable } from './components/CoinsTable';
import { CoinInfo } from './components/CoinInfo';
import { InfoBar } from './components/InfoBar';
import { NavBar } from './components/NavBar';
import { Transactions } from './components/Transactions';
import { AddTransactionWarning } from './components/AddTransactionWarning';
import { Portfolio } from './components/Portfolio';
import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { TransactionsContext } from './context/TransactionsContext';
import { useState } from 'react';

import { loadFromLs, loadFromLsFav } from './utils/localstorage';

function App() {
  const [context, setContext] = useState({
    transactions: loadFromLs(),
    valuePortfolio: 0,
    favoritesCoins: loadFromLsFav(),
  });

  const contextValue = {
    transactions: context.transactions,
    valuePortfolio: context.valuePortfolio,
    favoritesCoins: context.favoritesCoins,

    setTransactions: (transactions) =>
      setContext({ ...context, transactions }),
    setValuePortfolio: (valuePortfolio) =>
      setContext({ ...context, valuePortfolio }),
    setFavoritesCoins: (favoritesCoins) =>
      setContext({ ...context, favoritesCoins }),
  };
  console.log();
  return (
    <Box
      className="App"
      style={{
        height: '100%',
        minHeight: '100vh',
        backgroundColor: '#e5e5e5',
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
            <Route
              path="/portfolio"
              element={
                context.transactions.length === 0 ? (
                  <AddTransactionWarning />
                ) : (
                  <Portfolio />
                )
              }
            />
          </Routes>
        </TransactionsContext.Provider>
      </Container>
    </Box>
  );
}

export default App;
