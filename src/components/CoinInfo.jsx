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
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';

import LinearProgress from '@mui/material/LinearProgress';

import { Link } from 'react-router-dom';
import { useCoins } from '../hooks/useCoins';

export const CoinInfo = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const coin = queryParams.get('id');

  const { coins, loading, fetchCoinGecko } = useCoins();
  const crypto = coins[0];

  useEffect(() => {
    fetchCoinGecko({ id: coin });
  }, [fetchCoinGecko, coin]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!crypto) {
    return <span>Error while loading crypto</span>;
  }

  const progress =
    ((crypto['current_price'] - crypto['low_24h']) /
      (crypto['high_24h'] - crypto['low_24h'])) *
    100;

  return (
    <div>
      <Breadcrumbs>
        <Link to="/" color="inherit">
          Home
        </Link>
        <Typography color="text.primary">{coin}</Typography>
      </Breadcrumbs>
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
              <Typography variant="h4">
                $ {crypto['current_price']}
              </Typography>
              <Box style={{ flexGrow: 1, padding: '20px 0 10px 0' }}>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                />
              </Box>
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography>$ {crypto['low_24h']}</Typography>
                <Typography>24H RANGE</Typography>
                <Typography>$ {crypto['high_24h']}</Typography>
              </Box>
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
                    <TableCell>Total Supply</TableCell>
                    <TableCell align={'right'}>
                      {crypto['total_supply']}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Max Supply</TableCell>
                    <TableCell align={'right'}>
                      {crypto['max_supply']}
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
    </div>
  );
};
