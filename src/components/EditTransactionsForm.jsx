import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState, useContext } from 'react';
import { TransactionsContext } from '../context/TransactionsContext';

import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { saveToLs } from '../utils/localstorage';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const EditTransactionsForm = (props) => {
  const context = useContext(TransactionsContext);
  const [valueAmount, setValueAmount] = useState(props.amount);
  const [valuePrice, setValuePrice] = useState(props.price);
  const [valueName, setValueName] = useState(props.name);
  const [transactionType, setTransactionType] = useState(props.type);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRadioChange = (event) => {
    setTransactionType(event.target.value);
  };

  const handleChangeAmount = (event) => {
    setValueAmount(event.target.value);
  };

  const handleChangePrice = (event) => {
    setValuePrice(event.target.value);
  };

  const findEditingTransaction = () => {
    let newTransactions = [...context.transactions];
    let searchElement = newTransactions.find(
      (el) => el.id === props.id,
    );
    newTransactions[newTransactions.indexOf(searchElement)] = {
      id: searchElement.id,
      type: transactionType,
      name: valueName,
      amount: parseFloat(valueAmount),
      price: parseFloat(valuePrice),
      date: props.date,
    };

    // let newObject = [];
    // for (let el of context.transactions) {
    //   if (props.id === el.id) {
    //     newObject.push({
    //       id: el.id,
    //       type: transactionType,
    //       name: valueName,
    //       amount: parseFloat(valueAmount),
    //       price: parseFloat(valuePrice),
    //       date: props.date,
    //     });
    //   } else {
    //     newObject.push(el);
    //   }
    // }
    return newTransactions;
  };

  const handleEditTransaction = () => {
    let transactionList = findEditingTransaction();
    saveToLs(transactionList);
    context.setTransactions(transactionList);

    setValueAmount(0);
    setValuePrice(0);
    handleClose();
  };
  return (
    <Box>
      <Button variant="contained" onClick={handleOpen}>
        Edit
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
                Edit ransaction
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
                  options={props.list}
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
                onClick={handleEditTransaction}
              >
                Edit transaction
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </Box>
  );
};
