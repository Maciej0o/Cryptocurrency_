import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useHistoryPrices } from '../hooks/useHistoryPrices';
import { useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { format } from 'date-fns';

export const CoinChart = (props) => {
  const { historyPrices, loading, fetchHistoryPrices } =
    useHistoryPrices();

  const id = props.coin;
  useEffect(() => {
    fetchHistoryPrices({ id });
  }, [fetchHistoryPrices, id]);

  const createDataChart = (historyPrices) => {
    return historyPrices.map((el) => {
      return {
        name: format(new Date(el[0]), 'dd/MM'),
        price: el[1],
        amt: el[1] * 1.3,
      };
    });
  };

  if (loading) {
    return <Box></Box>;
  }
  const data = createDataChart(historyPrices);

  return (
    <Box
      style={{
        margin: '80px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4">Price Chart</Typography>
      <AreaChart
        width={props.width}
        height={props.height}
        data={data}
      >
        {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" /> */}
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis dataKey="amt" />
        <Area
          type="monotone"
          dataKey="price"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Tooltip />
      </AreaChart>
    </Box>
  );
};
