import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

import Button from '@mui/material/Button';

import { useContext } from 'react';
import { TransactionsContext } from '../context/TransactionsContext';
import { EditTransactionsForm } from './EditTransactionsForm';

import { styled } from '@mui/styles';
import { saveToLs } from '../utils/localstorage';

export const removeTransaction = (id, transactions) => {
  return transactions.filter((transaction) => transaction.id !== id);
};

export const TransactionsTable = (props) => {
  const context = useContext(TransactionsContext);

  const Title = styled(TableCell)({
    fontSize: 15,
    fontWeight: 'bold',
  });

  if (!crypto) {
    return <span>Error while loading crypto</span>;
  }

  // TODO kiedys przerobic i przetestowac

  return (
    <Box style={{ margin: '40px 0 50px' }}>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple pagination table"
        >
          <TableHead>
            <TableRow>
              <Title>#</Title>
              <Title align="left">Coin</Title>
              <Title align="right">Purchase price</Title>
              <Title align="right">Amount</Title>
              <Title align="right">Value</Title>
              <Title align="right">Date</Title>
              <Title align="right"></Title>
              <Title align="right"></Title>
            </TableRow>
          </TableHead>
          <TableBody>
            {context.transactions.map((el) => (
              <TableRow
                key={el.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                {el.type === 'buy' ? (
                  <TableCell
                    component="th"
                    scope="row"
                    style={{
                      color: '#07BF29',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                    }}
                  >
                    {el.type}
                  </TableCell>
                ) : (
                  <TableCell
                    component="th"
                    scope="row"
                    style={{
                      color: '#D71212',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                    }}
                  >
                    {el.type}
                  </TableCell>
                )}
                <TableCell
                  align="left"
                  style={{
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                  }}
                >
                  {el.name}
                </TableCell>
                <TableCell
                  align="right"
                  style={{ textTransform: 'uppercase' }}
                >
                  $ {el.price}
                </TableCell>
                <TableCell align="right">{el.amount}</TableCell>
                <TableCell align="right">
                  $ {el.amount * el.price}
                </TableCell>
                <TableCell align="right">{el.date}</TableCell>

                <TableCell align="right">
                  <EditTransactionsForm
                    list={props.list}
                    id={el.id}
                    name={el.name}
                    amount={el.amount}
                    price={el.price}
                    type={el.type}
                    date={el.date}
                  />
                </TableCell>

                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => {
                      const newTransactions = removeTransaction(
                        el.id,
                        context.transactions,
                      );
                      saveToLs(newTransactions);
                      context.setTransactions(newTransactions);
                    }}
                  >
                    x
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
