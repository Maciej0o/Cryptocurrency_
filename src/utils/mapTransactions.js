export const mapTransactionsToPortfolio = (transactions) => {
  const newData = {};

  for (let i = 0; i < transactions.length; i++) {
    const name = transactions[i].name;
    const value =
      transactions[i].type === 'buy'
        ? transactions[i].amount
        : -transactions[i].amount;

    if (name in newData) {
      newData[name] += value;
    } else {
      newData[name] = value;
    }
  }

  return newData;
};

export const mapTransactionsValueOfPurchase = (transactions) => {
  const newData = {};

  for (let i = 0; i < transactions.length; i++) {
    const name = transactions[i].name;
    const value =
      transactions[i].type === 'buy'
        ? transactions[i].amount * transactions[i].price
        : -transactions[i].amount * transactions[i].price;

    if (name in newData) {
      newData[name] += value;
    } else {
      newData[name] = value;
    }
  }

  return newData;
};

// mappedTransactions - {key: cryptoName, value: cryptoCount}
// cryptoPrices - {key: cryptoName, value: cryptoValue}
export const getPortfolioSum = (mappedTransactions, cryptoPrices) => {
  let valuePortfolio = 0;
  for (let key of Object.keys(mappedTransactions)) {
    valuePortfolio += mappedTransactions[key] * cryptoPrices[key];
  }
  return valuePortfolio;
};
