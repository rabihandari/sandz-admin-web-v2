'use server';

import { Ivendor } from '@/types';
import { createAccount } from '@/firebase';
import { getAuthenticatedAppForUser } from '@/firebase/auth';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import {
  HUB_COLLECTION,
  SESSION_EXPIRED,
  USERS_COLLECTION,
  VENDOR_LIST_ROUTE,
} from '@/constants';

export const createVendor = async (vendor: Omit<Ivendor, 'uid'>) => {
  const app = await getAuthenticatedAppForUser();
  if (!app) throw new Error(SESSION_EXPIRED);

  const uid = await createAccount(
    USERS_COLLECTION,
    { ...vendor, isFirstLogin: true },
    VENDOR_LIST_ROUTE,
  );

  const { displayName, mobileNumber, photoUrl, type } = vendor;

  const firestore = getFirestore(app);

  await setDoc(doc(collection(firestore, HUB_COLLECTION), uid), {
    vendorId: uid,
    logoUrl: photoUrl,
    vendorName: displayName,
    phoneNumber: mobileNumber,
    hubType: type === 'Catering' ? 'Restaurant' : type,
  });
};
