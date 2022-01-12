import { useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import { useCoins } from '../hooks/useCoins';

export const PortfolioValueCell = ({ name, amount }) => {
  // call do api, ktory pobierze aktualny kurs dla tej kryptowaluty
  const { coins, loading, fetchCoinGecko } = useCoins();

  useEffect(() => {
    fetchCoinGecko({ id: name });
  }, [fetchCoinGecko, name]);

  if (loading) {
    return <TableCell />;
  }

  return (
    <TableCell align="right">
      {amount
        ? `$ ${(coins[0]['current_price'] * amount).toFixed(2)}`
        : `$ ${coins[0]['current_price']}`}
    </TableCell>
  );
};
