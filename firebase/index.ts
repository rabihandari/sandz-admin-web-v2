'use server';

import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  DocumentData,
  getFirestore,
  WithFieldValue,
} from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import { SESSION_EXPIRED } from '@/constants';
import { getAuthenticatedAppForUser } from '@/firebase/auth';

export const getDocument = async (
  collection: string,
  id: string,
): Promise<DocumentData | undefined> => {
  const app = await getAuthenticatedAppForUser();
  if (!app) throw new Error(SESSION_EXPIRED);

  const docRef = doc(getFirestore(app), collection, id);

  const docData = await getDoc(docRef);

  return docData.data();
};

export const getDocuments = async (
  collectionName: string,
): Promise<DocumentData[] | undefined> => {
  const app = await getAuthenticatedAppForUser();
  if (!app) throw new Error(SESSION_EXPIRED);

  const collectionRef = collection(getFirestore(app), collectionName);

  const data: DocumentData[] = [];

  const docs = await getDocs(collectionRef);

  docs.forEach((item) => data.push(item.data()));

  return data;
};

export const updateDocument = async (
  id: string,
  collectionName: string,
  data: WithFieldValue<DocumentData>,
  pathToRevalidate?: string,
): Promise<DocumentData | undefined> => {
  const app = await getAuthenticatedAppForUser();
  if (!app) throw new Error(SESSION_EXPIRED);

  const firestore = getFirestore(app);

  const docRef = doc(firestore, collectionName, id);

  await updateDoc(docRef, data);

  const updatedDoc = await getDoc(docRef);
  const updatedData = updatedDoc.exists() ? updatedDoc.data() : undefined;

  if (pathToRevalidate) {
    revalidatePath(pathToRevalidate);
  }

  return updatedData;
};

export const createDocument = async <T>(
  collectionName: string,
  data: WithFieldValue<DocumentData>,
  pathToRevalidate?: string,
) => {
  const app = await getAuthenticatedAppForUser();
  if (!app) throw new Error(SESSION_EXPIRED);

  const firestore = getFirestore(app);

  const newDocRef = doc(collection(firestore, collectionName));

  const dataWithId = {
    id: newDocRef.id,
    ...data,
  };

  await setDoc(newDocRef, dataWithId);

  if (pathToRevalidate) {
    revalidatePath(pathToRevalidate);
  }
};

export const deleteDocument = async (
  id: string,
  collection: string,
  imageUrl?: string,
  pathToRevalidate?: string,
) => {
  const app = await getAuthenticatedAppForUser();
  if (!app) throw new Error(SESSION_EXPIRED);

  const docRef = doc(getFirestore(app), collection, id);

  // TODO delete image, might need to change how images are being saved

  await deleteDoc(docRef);

  if (pathToRevalidate) {
    revalidatePath(pathToRevalidate);
  }
};
