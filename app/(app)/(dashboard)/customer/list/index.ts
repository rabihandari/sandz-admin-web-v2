import {
  query,
  where,
  collection,
  getFirestore,
  getCountFromServer,
} from 'firebase/firestore';
import { getAuthenticatedAppForUser } from '@/firebase/auth';
import { SPOTS_COLLECTION, SESSION_EXPIRED } from '@/constants';

export const handleCountReservations = async (id: string) => {
  const app = await getAuthenticatedAppForUser();
  if (!app) throw new Error(SESSION_EXPIRED);

  const q = query(
    collection(getFirestore(app), SPOTS_COLLECTION),
    where('customerId', '==', id),
  );

  const snapshot = await getCountFromServer(q);

  return snapshot.data().count;
};
