import { Link } from 'react-router-dom';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

import { styled } from '@mui/styles';

const Title = styled(TableCell)({
  fontSize: 15,
  fontWeight: 'bold',
});

export const CoinsUiTable = ({
  coins,
  favoritesCoins,
  page,
  rowsPerPage,
  onPageChange,
  handleChangeRowsPerPage,
  removeFromFavorite,
  addToFavorite,
  countRows,
  currencySign,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        aria-label="simple pagination table"
      >
        <TableHead>
          <TableRow>
            <Title style={{ width: 5 }}></Title>
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
              <TableCell
                component="th"
                scope="row"
                style={{
                  cursor: 'pointer',
                }}
                onClick={() =>
                  favoritesCoins.includes(el.id)
                    ? removeFromFavorite(el.id)
                    : addToFavorite(el.id)
                }
              >
                {favoritesCoins.includes(el.id) === true ? (
                  <StarIcon
                    style={{
                      color: '#EEC809',
                      display: 'flex',
                      alignSelf: 'center',
                    }}
                  />
                ) : (
                  <StarBorderOutlinedIcon
                    style={{ color: '#BEBDBB' }}
                  />
                )}
              </TableCell>
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
                {currencySign} {el['current_price']}
              </TableCell>
              <TableCell align="right">
                {el['price_change_percentage_24h'].toFixed(1)}%
              </TableCell>
              <TableCell align="right">
                {currencySign} {el['market_cap']}
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
            colSpan={5}
            count={countRows}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onPageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
