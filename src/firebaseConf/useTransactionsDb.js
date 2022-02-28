import { ref, set, child, get } from 'firebase/database';
import { db } from './db';

export const useTransactionsDb = () => {
  const setTransactionsCoin = async ({
    uid,
    id,
    type,
    name,
    amount,
    price,
    date,
  }) => {
    try {
      return await set(ref(db, `transactions/${uid}/${id}`), {
        type,
        name,
        amount,
        price,
        date,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const getTransactionsByUid = async (uid) => {
    const dbRef = ref(db);
    return get(child(dbRef, `transactions/${uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        }
        return null;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  };

  return { setTransactionsCoin, getTransactionsByUid };
};
