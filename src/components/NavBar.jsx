import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <img
            src="https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png?1547034615"
            alt=""
            style={{ width: 40, marginRight: 10 }}
          />
          <Typography variant="h4">CryptoInfo</Typography>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              color: '#fff',
              fontWeight: 'bold',
            }}
          >
            <Button
              color="inherit"
              style={{
                marginLeft: 100,
                fontSize: 18,
              }}
            >
              Coins
            </Button>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
