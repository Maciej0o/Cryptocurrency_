import { useState, useCallback } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';

import { auth, provider } from './firebaseConf';
import { useUserDb } from './useUserDb';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { createUser, getUserByUid } = useUserDb();

  const signInWithGoogle = useCallback(async () => {
    try {
      const res = await signInWithPopup(auth, provider);

      const dbAccount = await getUserByUid(res.user.uid);

      if (!dbAccount) {
        await createUser({
          email: res.user.email,
          uid: res.user.uid,
        });
      }

      setUser(res.user);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const logoutGoogle = useCallback(async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return {
    user,
    loading,
    signInWithGoogle,
    logoutGoogle,
  };
};
