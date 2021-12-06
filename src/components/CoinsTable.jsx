import { useContext, useEffect, useState } from 'react';
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
import CircularProgress from '@mui/material/CircularProgress';

import { useCoins } from '../hooks/useCoins';

export const CoinsTable = () => {
  const context = useContext(CoinContext);

  // pageId ma byc czytane z url (useLocation)
  const pageId = 0;
  const { page, setPage } = useState(pageId);
  const { coins, loading, fetchCoinGecko } = useCoins();

  useEffect(() => {
    fetchCoinGecko(null, pageId);
  }, [fetchCoinGecko, pageId]);

  const onPageChange = (event, newPage) => {
    console.log(newPage);
    //setPage(page);
  };

  if (loading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  console.log(coins, context.coin);
  return (
    <Box>
      <Typography
        variant="h4"
        align="left"
        style={{ margin: '20px 0 40px 0' }}
      >
        Cryptocurrency Prices by Market Cap
      </Typography>

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple pagination table"
        >
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Coin</TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">24H</TableCell>
              <TableCell align="right">Mkt Cap</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coins.map((el) => (
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
                    to={`coin/${el.id}`}
                    style={{
                      textDecoration: 'none',
                      color: '#000000',
                      display: 'flex',
                      alignItems: 'center',
                    }}
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
                  {el['price_change_percentage_24h'].toFixed(1)}%
                </TableCell>
                <TableCell align="right">
                  $ {el['market_cap']}
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
                50,
                { label: 'All', value: -1 },
              ]}
              colSpan={4}
              count={10000}
              rowsPerPage={50}
              page={page}
              onPageChange={onPageChange}
            />
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};
