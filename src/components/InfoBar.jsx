import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { useGlobalInfo } from '../hooks/useGlobalInfo';
import { useEffect } from 'react';
import { styled } from '@mui/styles';

// import { firebaseApp } from '../firebaseConf/firebaseConf';

const Title = styled(Typography)({
  fontSize: 14,
  fontWeight: 'bold',
  paddingRight: 5,
});
// console.log(JSON.stringify(firebaseApp));
const Text = styled(Typography)({
  fontSize: 14,
  paddingRight: 25,
  color: '#00b4d8',
});

export const InfoBar = () => {
  // console.log(JSON.stringify(firebaseApp));
  const { global, loading, fetchGlobalInfo } = useGlobalInfo();
  useEffect(() => {
    fetchGlobalInfo({});
  }, [fetchGlobalInfo]);

  if (loading) {
    return <Paper> wronk</Paper>;
  }
  return (
    <Paper>
      <Container
        style={{
          display: 'flex',
          justifyContent: 'left',
          paddingTop: '10px',
          paddingBottom: '10px',
        }}
      >
        <Grid container spacing={1}>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            style={{ display: 'flex' }}
          >
            <Title>Coins: </Title>
            <Text>{global['active_cryptocurrencies']}</Text>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            style={{ display: 'flex' }}
          >
            <Title>Market Cap:</Title>
            <Text>
              ${global['total_market_cap'].usd.toFixed(0)}
              <Typography
                variant="subtitle"
                style={{ paddingLeft: 2, color: '#8d99ae' }}
              >
                {global[
                  'market_cap_change_percentage_24h_usd'
                ].toFixed(1)}
                %
              </Typography>
            </Text>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            style={{ display: 'flex' }}
          >
            <Title>24h Vol:</Title>
            <Text>${global['total_volume'].usd.toFixed(0)}</Text>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            style={{ display: 'flex' }}
          >
            <Title>Dominance:</Title>
            <Text style={{ display: 'flex' }}>
              BTC {global['market_cap_percentage'].btc.toFixed(1)}%
            </Text>
            <Text style={{ display: 'flex' }}>
              ETH {global['market_cap_percentage'].eth.toFixed(1)}%
            </Text>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};
