import React from 'react';
import { Iuser } from '@/types';
import { User } from 'firebase/auth';
import { getDocument } from '@/firebase';
import { USERS_COLLECTION } from '@/constants';
import { onAuthStateChanged } from '@/utils/firebase-config';

export const useUserSession = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [userProfile, setUserProfile] = React.useState<Iuser | null>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser) => {
      setUser(authUser);

      if (authUser) {
        (async () => {
          const res = await getDocument(USERS_COLLECTION, authUser.uid);

          if (res) setUserProfile(res as Iuser);
        })();
      }
    });

    return unsubscribe;
  }, []);

  return {
    user,
    userProfile,
    setUserProfile,
  };
};
