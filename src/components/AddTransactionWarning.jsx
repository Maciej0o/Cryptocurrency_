import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// import { Transactions } from './components/Transactions';

import { Link } from 'react-router-dom';

export const AddTransactionWarning = () => {
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4">
        You dont have any transactions, add transaction and go back
        here
      </Typography>
      <Link
        to={`/transactions`}
        style={{
          textDecoration: 'none',
          color: '#000000',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          style={{ marginTop: '40px', fontSize: '25px' }}
        >
          Add TRANSACTION
        </Button>
      </Link>
    </Box>
  );
};
