import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useGlobalInfo } from '../hooks/useGlobalInfo';
import { useEffect } from 'react';
import { styled } from '@mui/styles';

const Title = styled(Typography)({
  fontSize: 14,
  fontWeight: 'bold',
  paddingRight: 5,
});

const Text = styled(Typography)({
  fontSize: 14,
  paddingRight: 25,
  color: '#00b4d8',
});

export const InfoBar = () => {
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
        <Title>Coins: </Title>
        <Text>{global['active_cryptocurrencies']}</Text>
        <Title>Market Cap:</Title>
        <Text>
          ${global['total_market_cap'].usd.toFixed(0)}
          <Typography
            variant="subtitle"
            style={{ paddingLeft: 2, color: '#8d99ae' }}
          >
            {global['market_cap_change_percentage_24h_usd'].toFixed(
              1,
            )}
            %
          </Typography>
        </Text>

        <Title>24h Vol:</Title>
        <Text>${global['total_volume'].usd.toFixed(0)}</Text>
        <Title>Dominance:</Title>
        <Text>
          BTC {global['market_cap_percentage'].btc.toFixed(1)}%
        </Text>
        <Text>
          ETH {global['market_cap_percentage'].eth.toFixed(1)}%
        </Text>
      </Container>
    </Paper>
  );
};
