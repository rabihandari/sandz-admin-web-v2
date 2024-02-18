import { db } from '@/utils/firebase-config';
import { doc, getDoc } from 'firebase/firestore';

export const getDocument = async (collection: string, id: string) => {
  const docRef = doc(db, collection, id);

  const docData = await getDoc(docRef);

  return docData.data();
};
