import { createContext } from 'react';

export const TransactionsContext = createContext({
  transactions: [],
  valuePortfolio: 0,
  favoritesCoins: [],
  user: null,
});
