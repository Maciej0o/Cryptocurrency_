import { useEffect } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import CircularProgress from '@mui/material/CircularProgress';

import { useCoins } from '../hooks/useCoins';

export const CoinInfo = () => {
  console.log('test');

  const { coins, loading, fetchCoinGecko } = useCoins();
  const crypto = coins[0];

  useEffect(() => {
    fetchCoinGecko('bitcoin');
  }, [fetchCoinGecko]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!crypto) {
    return <span>Error while loading crypto</span>;
  }

  return (
    <Card
      variant="outlined"
      sx={{ minWidth: 275 }}
      style={{ margin: 40, padding: 40 }}
    >
      <CardContent>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <img src={crypto.image} alt="" style={{ width: 70 }} />
            <Typography variant="h2" gutterBottom>
              {crypto.name}
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Table aria-label="simple">
              <TableBody>
                <TableRow>
                  <TableCell>Market Cap</TableCell>
                  <TableCell align={'right'}>
                    $ {crypto['market_cap']}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fully Diluted Valuation</TableCell>
                  <TableCell align={'right'}>
                    $ {crypto['fully_diluted_valuation']}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Vol</TableCell>
                  <TableCell align={'right'}>
                    $ {crypto['total_volume']}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
          <Grid item xs={5}>
            <Table aria-label="simple">
              <TableBody>
                <TableRow>
                  <TableCell>High 24h</TableCell>
                  <TableCell align={'right'}>
                    $ {crypto['high_24h']}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Low 24h</TableCell>
                  <TableCell align={'right'}>
                    $ {crypto['low_24h']}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ATH</TableCell>
                  <TableCell align={'right'}>
                    $ {crypto.ath}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
