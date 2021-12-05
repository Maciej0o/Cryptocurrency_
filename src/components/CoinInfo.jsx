import { CoinContext } from '../context/CoinContext';
import { useContext } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';

export const CoinInfo = (props) => {
  const context = useContext(CoinContext);
  const crypto = props.coins[context.coin - 1];
  console.log(crypto, 'fgfg');
  return (
    <Card sx={{ minWidth: 275 }} style={{ margin: 40, padding: 40 }}>
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
                    {crypto['fully_diluted_valuation']}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Vol</TableCell>
                  <TableCell align={'right'}>
                    {crypto['total_volume']}
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
                    {crypto['high_24h']}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Low 24h</TableCell>
                  <TableCell align={'right'}>
                    {crypto['low_24h']}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ATH</TableCell>
                  <TableCell align={'right'}>{crypto.ath}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
