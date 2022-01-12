import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
import Button from '@mui/material/Button';
import { styled } from '@mui/styles';

import { useCoins } from '../hooks/useCoins';

export const CoinsTable = () => {
  // pageId ma byc czytane z url (useLocation)
  // const pageId = 2;
  const [page, setPage] = useState(0);
  const { coins, loading, fetchCoinGecko } = useCoins();
  const [rowsPerPage, setRowsPerPage] = useState(50);

  useEffect(() => {
    fetchCoinGecko({ page, rowsPerPage });
  }, [fetchCoinGecko, page, rowsPerPage]);

  const onPageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const Title = styled(TableCell)({
    fontSize: 15,
    fontWeight: 'bold',
  });

  if (loading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

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
              <Title>#</Title>
              <Title align="left">Coin</Title>
              <Title align="left"></Title>
              <Title align="right">Price</Title>
              <Title align="right">24H</Title>
              <Title align="right">Mkt Cap</Title>
              <Title align="right"></Title>
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
                    to={`coin/?id=${el.id}`}
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
                <TableCell align="right">
                  <Link
                    to={`transactions/?id=${el.id}`}
                    style={{
                      textDecoration: 'none',
                      color: '#000000',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Button variant="contained">Add</Button>
                  </Link>
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
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onPageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};
