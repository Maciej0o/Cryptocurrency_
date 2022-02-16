import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { loadFromLsUser } from '../utils/localstorage';
import { useState, useEffect } from 'react';

// import {
//   signInWithGoogle,
//   logoutGoogle,
// } from '../firebaseConf/firebaseConf';
import { useAuth } from '../firebaseConf/useAuth';

export const NavBar = () => {
  // const [user, setUser] = useState(loadFromLsUser());

  const { user, loading, signInWithGoogle, logoutGoogle } = useAuth();

  // useEffect(() => {
  //   signInWithGoogle({});
  // }, [signInWithGoogle]);

  // useEffect(() => {
  //   logoutGoogle({});
  // }, [logoutGoogle]);

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

          {!!user === true ? (
            <Link
              to="/transactions"
              style={{
                textDecoration: 'none',
                color: '#fff',
                fontWeight: 'bold',
              }}
            >
              <Button
                color="inherit"
                style={{
                  fontSize: 18,
                }}
              >
                Transactions
              </Button>
            </Link>
          ) : (
            <Box> </Box>
          )}
          {!!user === true ? (
            <Link
              to="/portfolio"
              style={{
                textDecoration: 'none',
                color: '#fff',
                fontWeight: 'bold',
              }}
            >
              <Button
                color="inherit"
                style={{
                  fontSize: 18,
                }}
              >
                Portfolio
              </Button>
            </Link>
          ) : (
            <Box></Box>
          )}
          <Button
            color="secondary"
            style={{
              backgroundColor: 'white',
              margin: '0 5px 0 40px',
            }}
            onClick={signInWithGoogle}
          >
            Sign in
          </Button>
          <Button
            color="secondary"
            style={{ backgroundColor: 'white' }}
            onClick={logoutGoogle}
          >
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
