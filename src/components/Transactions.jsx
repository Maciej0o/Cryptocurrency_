import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

import { TransactionsTable } from './TransactionsTable';
import { useEffect, useState, useContext } from 'react';
import { useCoins } from '../hooks/useCoins';
import { useSearchParams } from 'react-router-dom';
import { TransactionsContext } from '../context/TransactionsContext';
import { saveToLs } from '../utils/localstorage';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

import { loadFromLsUser } from '../utils/localstorage';

import { useTransactionsDb } from '../firebaseConf/useTransactionsDb';

export const Transactions = () => {
  const [params] = useSearchParams();
  const searchIdParam = params.get('id');
  const [valueAmount, setValueAmount] = useState(null);
  const [valuePrice, setValuePrice] = useState(null);
  const [valueName, setValueName] = useState(searchIdParam || null);
  const [transactionType, setTransactionType] = useState('buy');
  // const [idEditTransaction, setIdEditTransaction] = useState(null);

  const { coins, loading, fetchCoinGecko } = useCoins();
  const crypto = coins[0];

  const context = useContext(TransactionsContext);

  const { setTransactionsCoin, getTransactionsByUid } =
    useTransactionsDb();

  const handleChangeAmount = (event) => {
    setValueAmount(event.target.value);
  };

  const handleChangePrice = (event) => {
    setValuePrice(event.target.value);
  };

  useEffect(() => {
    fetchCoinGecko({});
  }, [fetchCoinGecko]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!crypto) {
    return <span>Error while loading crypto</span>;
  }
  console.log(context.transactions);

  const handleChangeCoinsList = () => {
    const newTransactions = context.transactions.concat({
      id: uuidv4(),
      type: transactionType,
      name: valueName,
      amount: parseFloat(valueAmount),
      price: parseFloat(valuePrice),
      date: format(new Date(), 'dd-MM-yyyy  HH:mm:ss '),
    });
    saveToLs(newTransactions);
    context.setTransactions(newTransactions);

    setTransactionsCoin({
      uid: loadFromLsUser(),
      id: uuidv4(),
      type: transactionType,
      name: valueName,
      amount: parseFloat(valueAmount),
      price: parseFloat(valuePrice),
      date: format(new Date(), 'dd-MM-yyyy  HH:mm:ss '),
    });

    setValueAmount(0);
    setValuePrice(0);
  };

  const handleRadioChange = (event) => {
    setTransactionType(event.target.value);
  };

  const list = coins.map((coin) => coin.id);
  return (
    <Box>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Card
            variant="outlined"
            sx={{ minWidth: 275 }}
            style={{
              padding: 20,
            }}
          >
            <CardContent
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="h4" gutterBottom>
                Transactions
              </Typography>
              <Typography variant="p" gutterBottom>
                Add your transaction
              </Typography>
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  width: '80%',
                  padding: 40,
                }}
              >
                <RadioGroup
                  aria-label="transaction"
                  defaultValue="buy"
                  value={transactionType}
                  name="radio-buttons-group"
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="buy"
                    control={<Radio />}
                    label="Buy"
                  />
                  <FormControlLabel
                    value="sell"
                    control={<Radio />}
                    label="Sell"
                  />
                </RadioGroup>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={list}
                  onInputChange={(event, newInputValue) => {
                    setValueName(newInputValue);
                  }}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Coin" />
                  )}
                  value={valueName || 'bitcoin'}
                />
                <TextField
                  id="outlined-multiline-flexible"
                  label="Purchase price"
                  multiline
                  maxRows={4}
                  value={valuePrice}
                  onChange={handleChangePrice}
                />
                <TextField
                  id="outlined-multiline-flexible"
                  label="Amount"
                  multiline
                  maxRows={4}
                  value={valueAmount}
                  onChange={handleChangeAmount}
                />
              </Box>

              <Button
                variant="contained"
                onClick={handleChangeCoinsList}
              >
                Add transaction
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <TransactionsTable list={list} />
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </Box>
  );
};
