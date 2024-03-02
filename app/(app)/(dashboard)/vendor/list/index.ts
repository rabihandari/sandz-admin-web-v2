import { HUB_COLLECTION, SESSION_EXPIRED } from '@/constants';
import { getAuthenticatedAppForUser } from '@/firebase/auth';
import {
  collection,
  getFirestore,
  getCountFromServer,
} from 'firebase/firestore';

export const handleCountOrders = async (id: string) => {
  const app = await getAuthenticatedAppForUser();
  if (!app) throw new Error(SESSION_EXPIRED);

  const snapshot = await getCountFromServer(
    collection(getFirestore(app), HUB_COLLECTION, id, 'orders'),
  );

  return snapshot.data().count;
};
