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

export const CoinsTableChart = (props) => {
  const { historyPrices, loading, fetchHistoryPrices } =
    useHistoryPrices();

  const id = props.coin;
  useEffect(() => {
    fetchHistoryPrices({ id });
  }, [fetchHistoryPrices, id]);

  const createDataChart = (historyPrices) => {
    return historyPrices.map((el) => {
      return {
        price: el[1],
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <AreaChart width={150} height={50} data={data}>
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
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
