import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/styles';

// import { useContext } from 'react';
// import { TransactionsContext } from '../context/TransactionsContext';

const Title = styled(TableCell)({
  fontSize: 15,
  fontWeight: 'bold',
});

export const PortfolioTable = (props) => {
  // const context = useContext(TransactionsContext);
  // console.log(props.valuePortfolio);
  const makeTable = (ob) => {
    let newArray = [];
    for (const [key, value] of Object.entries(
      props.mapTransactions,
    )) {
      //   newArray.push({ name: key, amount: value });
      newArray.push(
        <TableRow
          sx={{
            '&:last-child td, &:last-child th': { border: 0 },
          }}
        >
          <TableCell></TableCell>
          <TableCell
            align="left"
            style={{
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}
          >
            {key}
          </TableCell>

          <TableCell
            align="right"
            style={{ textTransform: 'uppercase' }}
          >
            {value}
          </TableCell>
          <TableCell
            align="right"
            style={{ textTransform: 'uppercase' }}
          >
            ${props.prices[key]}
          </TableCell>
          <TableCell
            align="right"
            style={{ textTransform: 'uppercase' }}
          >
            ${props.trasnactionsValueOfPurchase[key]}
          </TableCell>
          <TableCell
            align="right"
            style={{ textTransform: 'uppercase' }}
          >
            ${(props.prices[key] * value).toFixed(2)}
          </TableCell>

          {((props.prices[key] * value -
            props.trasnactionsValueOfPurchase[key]) /
            props.trasnactionsValueOfPurchase[key]) *
            100 >=
          0 ? (
            <TableCell
              align="right"
              style={{
                textTransform: 'uppercase',
                color: '#07BF29',
                fontWeight: 'bold',
              }}
            >
              {(
                ((props.prices[key] * value -
                  props.trasnactionsValueOfPurchase[key]) /
                  props.trasnactionsValueOfPurchase[key]) *
                100
              ).toFixed(2)}
              %
            </TableCell>
          ) : (
            <TableCell
              align="right"
              style={{
                textTransform: 'uppercase',
                color: '#D71212',
                fontWeight: 'bold',
              }}
            >
              {(
                ((props.prices[key] * value -
                  props.trasnactionsValueOfPurchase[key]) /
                  props.trasnactionsValueOfPurchase[key]) *
                100
              ).toFixed(2)}
              %
            </TableCell>
          )}
        </TableRow>,
      );
    }
    return newArray;
  };

  let table = makeTable(props.mapTransactions);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple pagination table"
        >
          <TableHead>
            <TableRow>
              <Title>#</Title>
              <Title align="left">Coin</Title>
              <Title align="right">Amount</Title>
              <Title align="right">Price</Title>
              <Title align="right">Purchase Value</Title>
              <Title align="right">Actual Value</Title>
              <Title align="right">Change %</Title>
            </TableRow>
          </TableHead>
          <TableBody>{table}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
