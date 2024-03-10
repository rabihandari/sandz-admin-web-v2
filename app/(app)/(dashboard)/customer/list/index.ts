import {
  query,
  where,
  collection,
  getFirestore,
  getDocs,
  getCountFromServer,
} from 'firebase/firestore';
import { getAuthenticatedAppForUser } from '@/firebase/auth';
import { SPOTS_COLLECTION, RESERVATIONS_COLLECTION, SESSION_EXPIRED } from '@/constants';

export const handleCountReservations = async (id: string) => {
  const app = await getAuthenticatedAppForUser();
  if (!app) throw new Error(SESSION_EXPIRED);

  // Fetching the customer's spots...
  var spotIds: string[] = []
  const spotsQuery = query(
    collection(getFirestore(app), SPOTS_COLLECTION),
    where('customerId', '==', id),
  );
  const spotsSnapshot = await getDocs(spotsQuery)
  spotsSnapshot.forEach((doc: any) => {
    spotIds.push(doc.data().id)
  })

  // Counting the total number of reservations for all spots...
  const reservationsQuery = query(
    collection(getFirestore(app), RESERVATIONS_COLLECTION),
    where('spotId', 'in', spotIds)
  )
  const reservationsSnapshot = await getCountFromServer(reservationsQuery);
  

  return reservationsSnapshot.data().count;
};
