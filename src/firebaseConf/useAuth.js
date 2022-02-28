import { useState, useCallback } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, provider } from './firebaseConf';
import { useUserDb } from './useUserDb';

export const useAuth = () => {
  const [user, loading] = useAuthState(auth);
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
    } catch (err) {
      console.error(err);
    } finally {
    }
  }, [createUser, getUserByUid]);

  const logoutGoogle = useCallback(async () => {
    try {
      await signOut(auth);
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
