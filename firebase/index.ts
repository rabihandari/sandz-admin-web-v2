'use server';

import {
  doc,
  where,
  query,
  setDoc,
  getDoc,
  getDocs,
  Timestamp,
  updateDoc,
  deleteDoc,
  collection,
  DocumentData,
  getFirestore,
  WithFieldValue,
  QueryConstraint,
} from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import { customInitApp } from '@/lib/firebase-admin-config';
import { getAuthenticatedAppForUser } from '@/firebase/auth';
import { DEFAULT_PASSWORD, SESSION_EXPIRED } from '@/constants';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

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
  filters: { [key: string]: string } = {},
): Promise<DocumentData[] | undefined> => {
  const app = await getAuthenticatedAppForUser();
  if (!app) throw new Error(SESSION_EXPIRED);

  const queryContrains: QueryConstraint[] = [];

  Object.keys(filters).forEach((key) => {
    queryContrains.push(where(key, '==', filters[key]));
  });

  const collectionRef = collection(getFirestore(app), collectionName);

  const data: DocumentData[] = [];

  const q = query(collectionRef, ...queryContrains);

  const docs = await getDocs(q);

  docs.forEach((item) =>
    data.push({ ...item.data(), createdAt: item.data().createdAt?.toDate() }),
  );

  return data;
};

export const updateDocument = async (
  id: string,
  collectionName: string,
  data: WithFieldValue<DocumentData>,
  pathToRevalidate?: string,
  updatedEmail?: string,
): Promise<DocumentData | undefined> => {
  const app = await getAuthenticatedAppForUser();
  if (!app) throw new Error(SESSION_EXPIRED);

  const firestore = getFirestore(app);

  const docRef = doc(firestore, collectionName, id);

  if (updatedEmail) {
    const { getAuth: getAdminAuth } = await import('firebase-admin/auth');

    const adminApp = customInitApp();
    const auth = getAdminAuth(adminApp);

    await auth.updateUser(id, {
      email: updatedEmail,
    });
  }

  await updateDoc(docRef, data);

  const updatedDoc = await getDoc(docRef);
  const updatedData = updatedDoc.exists()
    ? { ...updatedDoc.data(), createdAt: updatedDoc.data().createdAt?.toDate() }
    : undefined;

  if (pathToRevalidate) {
    revalidatePath(pathToRevalidate);
  }

  return updatedData;
};

export const createDocument = async (
  collectionName: string,
  data: WithFieldValue<DocumentData>,
  pathToRevalidate?: string,
  id?: string,
  identifier: string = 'id',
) => {
  const app = await getAuthenticatedAppForUser();
  if (!app) throw new Error(SESSION_EXPIRED);

  const firestore = getFirestore(app);

  const newDocRef = doc(collection(firestore, collectionName), id);

  const dataWithId = {
    [identifier]: newDocRef.id,
    ...data,
    createdAt: Timestamp.fromDate(new Date()),
  };

  await setDoc(newDocRef, dataWithId);

  if (pathToRevalidate) {
    revalidatePath(pathToRevalidate);
  }
};

export const createAccount = async <T extends { emailAddress: string }>(
  collectionName: string,
  data: T,
  pathToRevalidate?: string,
) => {
  const app = await getAuthenticatedAppForUser();
  if (!app) throw new Error(SESSION_EXPIRED);

  const auth = getAuth(app);

  const user = await createUserWithEmailAndPassword(
    auth,
    data.emailAddress,
    DEFAULT_PASSWORD,
  );
  await createDocument(
    collectionName,
    data,
    pathToRevalidate,
    user.user.uid,
    'uid',
  );
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

export const deleteUserAccount = async (uid: string) => {
  const { getAuth: getAdminAuth } = await import('firebase-admin/auth');

  const adminApp = customInitApp();
  const auth = getAdminAuth(adminApp);

  await auth.deleteUser(uid);
};
