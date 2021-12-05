import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CoinContext } from '../context/CoinContext';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';

export const CoinsTable = (props) => {
  const context = useContext(CoinContext);

  console.log(props.coins, context.coin);
  return (
    <Box>
      <Typography variant="h4" align="left">
        Cryptocurrency Prices by Market Cap
      </Typography>

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple pagination table"
        >
          <TableHead>
            <TableRow
              style={{
                fontWeight: 'bold',
              }}
            >
              <TableCell>#</TableCell>
              <TableCell align="left">Coin</TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">24H %</TableCell>
              <TableCell align="right">Mkt Cap</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.coins.map((el) => (
              <TableRow
                key={el.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {el['market_cap_rank']}
                </TableCell>

                <TableCell
                  align="left"
                  style={{
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                  }}
                >
                  <Link
                    to="coin"
                    style={{
                      textDecoration: 'none',
                      color: '#000000',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    onClick={() =>
                      context.setCoin(el['market_cap_rank'])
                    }
                  >
                    <img
                      src={el.image}
                      alt=""
                      style={{ width: 20, paddingRight: 10 }}
                    />
                    {el.name}
                  </Link>
                </TableCell>

                <TableCell
                  align="left"
                  style={{ textTransform: 'uppercase' }}
                >
                  {el.symbol}
                </TableCell>
                <TableCell align="right">
                  $ {el['current_price']}
                </TableCell>
                <TableCell align="right">
                  {el['price_change_percentage_24h']}
                </TableCell>
                <TableCell align="right">
                  {el['market_cap']}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TablePagination
              rowsPerPageOptions={[
                5,
                10,
                25,
                { label: 'All', value: -1 },
              ]}
              colSpan={4}
              count={props.coins.length}
              rowsPerPage={50}
              page={0}
            />
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};
