import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { TransactionsContext } from '../context/TransactionsContext';
import { useContext } from 'react';
import { PortfolioTable } from './PortfolioTable';
import {
  mapTransactionsValueOfPurchase,
  mapTransactionsToPortfolio,
  getPortfolioSum,
} from '../utils/mapTransactions';
import { usePrices } from '../hooks/usePrices';
import { useEffect } from 'react';

export const Portfolio = () => {
  const { prices, loading, fetchPrices } = usePrices();
  const context = useContext(TransactionsContext);

  const mapTransactions = mapTransactionsToPortfolio(
    context.transactions,
  );

  const trasnactionsValueOfPurchase = mapTransactionsValueOfPurchase(
    context.transactions,
  );

  const idsToFetch = Object.keys(mapTransactions).sort().join(',');

  useEffect(() => {
    fetchPrices({ ids: idsToFetch });
  }, [idsToFetch, fetchPrices]);

  if (loading) {
    return <div>Loading</div>;
  }

  const valuePortfolio = getPortfolioSum(mapTransactions, prices);
  // tabela
  const purchaseValueOfPortfolio = Object.values(
    trasnactionsValueOfPurchase,
  ).reduce((prev, current) => (prev += current));

  return (
    <Box>
      <Grid
        container
        spacing={2}
        style={{ padding: '20px 0 40px 0' }}
      >
        <Grid item xs={12} sm={6} md={4}>
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
        <Grid item xs={12} sm={6} md={4}>
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
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography style={{ fontWeight: 'bold' }}>
                First Transation:{' '}
              </Typography>
              <Typography>{context.transactions[0].date}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography style={{ fontWeight: 'bold' }}>
                Actuall Account value:
              </Typography>
              <Typography>${valuePortfolio.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography style={{ fontWeight: 'bold' }}>
                Purchase value:
              </Typography>
              <Typography>${purchaseValueOfPortfolio}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography style={{ fontWeight: 'bold' }}>
                Profit/Loss:
              </Typography>
              {valuePortfolio - purchaseValueOfPortfolio > 0 ? (
                <Typography style={{ color: '#07BF29' }}>
                  ${valuePortfolio - purchaseValueOfPortfolio}
                </Typography>
              ) : (
                <Typography style={{ color: '#D71212' }}>
                  ${valuePortfolio - purchaseValueOfPortfolio}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Typography variant="h4" style={{ padding: 20 }}>
        Portfolio
      </Typography>
      <PortfolioTable
        mapTransactions={mapTransactions}
        prices={prices}
        trasnactionsValueOfPurchase={trasnactionsValueOfPurchase}
      />
    </Box>
  );
};
