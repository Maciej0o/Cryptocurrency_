import { ref, set, child, get } from 'firebase/database';
import { db } from './db';

export const useFavouritesDb = () => {
  const setFavouriteCoin = async ({
    uid,
    coin,
    isFavourite = true,
  }) => {
    try {
      return await set(
        ref(db, `favourites/${uid}/${coin}`),
        isFavourite,
      );
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
