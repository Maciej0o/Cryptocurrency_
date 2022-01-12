import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { TransactionsContext } from '../context/TransactionsContext';
import { useContext, useState } from 'react';
import { PortfolioTable } from './PortfolioTable';
import { mapTransactionsToPortfolio } from '../utils/mapTransactions';
import { usePrices } from '../hooks/usePrices';
import { useEffect } from 'react';

export const Portfolio = () => {
  const [valueOfPortfolio, setValueOfPortfolio] = useState(0);
  const { prices, loading, fetchPrices } = usePrices();
  const context = useContext(TransactionsContext);

  const mapTransactions = mapTransactionsToPortfolio(
    context.transactions,
  );

  const idsToFetch = Object.keys(mapTransactions).sort().join(',');

  useEffect(() => {
    fetchPrices({ ids: idsToFetch });
  }, [idsToFetch, fetchPrices]);

  console.log('transactions', prices);

  if (loading) {
    return <div>Loading</div>;
  }

  // tabela
  return (
    <Box>
      <Grid
        container
        spacing={2}
        style={{ padding: '20px 0 40px 0' }}
      >
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <Typography style={{ fontWeight: 'bold' }}>
                {context.transactions.length} Trades
              </Typography>
              <Typography>
                {`With 
                ${Object.getOwnPropertyNames(mapTransactions).length}
                 coins`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <Typography style={{ fontWeight: 'bold' }}>
                Last Transation:
              </Typography>
              <Typography>
                {
                  context.transactions[
                    context.transactions.length - 1
                  ].date
                }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <Typography style={{ fontWeight: 'bold' }}>
                First Transation:{' '}
              </Typography>
              <Typography>{context.transactions[0].date}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <Typography style={{ fontWeight: 'bold' }}>
                Account value:
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Typography variant="h4">Portfolio</Typography>
      <PortfolioTable mapTransactions={mapTransactions} />
    </Box>
  );
};
