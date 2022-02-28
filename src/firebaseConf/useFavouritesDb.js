import { useCallback } from 'react';
import { ref, set, child, get } from 'firebase/database';
import { db } from './db';

export const useFavouritesDb = () => {
  const setFavouriteCoin = useCallback(
    async ({ uid, coin, isFavourite = true }) => {
      try {
        return await set(
          ref(db, `favourites/${uid}/${coin}`),
          isFavourite,
        );
      } catch (e) {
        console.error(e);
      }
    },
    [],
  );

  const getFavouritesByUid = useCallback(async (uid) => {
    const dbRef = ref(db);
    return get(child(dbRef, `favourites/${uid}`))
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
  }, []);

  return { setFavouriteCoin, getFavouritesByUid };
};
