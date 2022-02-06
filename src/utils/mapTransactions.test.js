import {
  mapTransactionsToPortfolio,
  getPortfolioSum,
} from './mapTransactions';

describe('getPortfolioSum tests', () => {
  const mocMappedTransactions = {
    bitcoin: 2788,
    cardano: 3428,
  };

  const mocCryptoPrices = {
    bitcoin: 42149,
    cardano: 1.55,
  };

  const result = 117516725.4;

  test('should get sum of portfolio', () => {
    expect(
      getPortfolioSum(mocMappedTransactions, mocCryptoPrices),
    ).toEqual(result);
  });
});

describe('mapTransactionsToPortfolio tests', () => {
  const mocTransactions = [
    {
      id: '416d34b8-5011-4940-a21a-ef65add9de51',
      type: 'buy',
      name: 'bitcoin',
      amount: 4545,
      price: 545,
      date: '14-01-2022  10:55:03 ',
    },
    {
      id: '01cc16da-db55-40c8-96e3-e6c4cd1a38f6',
      type: 'buy',
      name: 'cardano',
      amount: 4545,
      price: 3430,
      date: '14-01-2022  10:55:31 ',
    },
    {
      id: '6b4dd80a-6211-4078-9392-93199bf0cbc5',
      type: 'sell',
      name: 'bitcoin',
      amount: 2323,
      price: 1233,
      date: '14-01-2022  10:55:52 ',
    },
  ];

  const result = {
    bitcoin: 2222,
    cardano: 4545,
  };
  test('should mapTransactionsToPortfolio', () => {
    expect(mapTransactionsToPortfolio(mocTransactions)).toEqual(
      result,
    );
  });
});
