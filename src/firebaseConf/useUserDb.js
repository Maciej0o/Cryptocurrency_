import { ref, set, child, get } from 'firebase/database';
import { db } from './db';

export const useUserDb = () => {
  const createUser = async ({ uid, email }) => {
    try {
      return await set(ref(db, `users/${uid}`), {
        uid,
        email,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const getUserByUid = async (uid) => {
    const dbRef = ref(db);
    return get(child(dbRef, `users/${uid}`))
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

  return { createUser, getUserByUid };
};
