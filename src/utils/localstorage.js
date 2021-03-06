const LS_TRANSACTIONS = 'ls_transactions';
const LS_FAVORITESCOINS = 'ls_favoritescoins';
const LS_USER = 'ls_user';

export const saveToLs = (data) => {
  localStorage.setItem(LS_TRANSACTIONS, JSON.stringify(data));
};

export const saveToLsFav = (data) => {
  localStorage.setItem(LS_FAVORITESCOINS, JSON.stringify(data));
};

export const saveToLsUser = (data) => {
  localStorage.setItem(LS_USER, JSON.stringify(data));
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

export const loadFromLsFav = () => {
  try {
    return JSON.parse(localStorage.getItem(LS_FAVORITESCOINS)) || [];
  } catch (e) {
    console.error(
      'Failed to load local storage for key: ' + LS_FAVORITESCOINS,
    );
    saveToLsFav([]);
    return [];
  }
};

export const loadFromLsUser = () => {
  try {
    return JSON.parse(localStorage.getItem(LS_USER)) || null;
  } catch (e) {
    console.error('Failed to load local storage for key: ' + LS_USER);
    saveToLsFav([]);
    return [];
  }
};
