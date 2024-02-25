import {
  doc,
  getDoc,
  getDocs,
  collection,
  DocumentData,
  getFirestore,
} from 'firebase/firestore';
import { getAuthenticatedAppForUser } from '@/serverActions';

export const getDocument = async (
  collection: string,
  id: string,
): Promise<DocumentData | undefined> => {
  const { app } = await getAuthenticatedAppForUser();
  if (!app) return;

  const docRef = doc(getFirestore(app), collection, id);

  const docData = await getDoc(docRef);

  return docData.data();
};

export const getDocuments = async (
  collectionName: string,
): Promise<DocumentData[] | undefined> => {
  const { app } = await getAuthenticatedAppForUser();
  if (!app) return;

  const collectionRef = collection(getFirestore(app), collectionName);

  const data: DocumentData[] = [];

  const docs = await getDocs(collectionRef);

  docs.forEach((item) => data.push(item.data()));

  return data;
};
