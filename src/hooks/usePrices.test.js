import { parseData } from './usePrices';

test('should parse api data by parseData to result', () => {
  const mockData = {
    bitcoin: {
      usd: 1,
    },
    ethereum: {
      usd: 3,
    },
  };

  const result = {
    bitcoin: 1,
    ethereum: 3,
  };

  expect(parseData(mockData)).toEqual(result);
});

test('should parse empty api data by parseData to result', () => {
  expect(parseData({})).toEqual({});
});
