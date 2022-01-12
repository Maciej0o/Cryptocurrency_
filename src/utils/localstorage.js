const LS_TRANSACTIONS = 'ls_transactions';

export const saveToLs = (data) => {
  localStorage.setItem(LS_TRANSACTIONS, JSON.stringify(data));
};

export const loadFromLs = () => {
  try {
    return JSON.parse(localStorage.getItem(LS_TRANSACTIONS)) || [];
  } catch (e) {
    console.error(
      'Failed to load local storage for key: ' + LS_TRANSACTIONS,
    );
    saveToLs([]);
    return [];
  }
};
