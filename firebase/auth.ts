'use server';

import { Iuser } from '@/types';
import { USERS_COLLECTION } from '@/constants';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { customInitApp } from '../lib/firebase-admin-config';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { firebaseApp, firebaseConfig } from '@/lib/firebase-config';

export const loginUser = async (token: string): Promise<Iuser | undefined> => {
  // dynamic import
  const { getAuth: getAdminAuth } = await import('firebase-admin/auth');
  const { getFirestore: getAdminFirestore } = await import(
    'firebase-admin/firestore'
  );

  const adminApp = customInitApp();
  const adminAuth = getAdminAuth(adminApp);
  const adminFirestore = getAdminFirestore(adminApp);

  const decodedToken = await adminAuth.verifyIdToken(token);

  if (!decodedToken) return;

  const userDoc = await adminFirestore
    .collection(USERS_COLLECTION)
    .doc(decodedToken.uid)
    .get();

  if (!userDoc.exists) return;

  const user = userDoc.data();

  if (!user || user?.role !== 'admin') return;

  const expiresIn = 60 * 60 * 24 * 14 * 1000;
  // const expiresIn = 300000;

  const sessionCookie = await adminAuth.createSessionCookie(token, {
    expiresIn,
  });

  // dynamic import
  const { cookies } = await import('next/headers');

  //Add the cookie to the browser
  cookies().set({
    name: 'session',
    value: sessionCookie,
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
  });

  return user as Iuser;
};

export const checkUserToken = async () => {
  // dynamic import
  const { cookies } = await import('next/headers');

  const token = cookies().get('session')?.value;

  try {
    if (!token) return;

    // dynamic import
    const { getAuth: getAdminAuth } = await import('firebase-admin/auth');
    const { getFirestore: getAdminFirestore } = await import(
      'firebase-admin/firestore'
    );

    const adminApp = customInitApp();
    const adminAuth = getAdminAuth(adminApp);
    const adminFirestore = getAdminFirestore(adminApp);

    const decodedIdToken = await adminAuth.verifySessionCookie(token);

    if (decodedIdToken) {
      const userDoc = await adminFirestore
        .collection(USERS_COLLECTION)
        .doc(decodedIdToken.uid)
        .get();

      return userDoc.data() as Iuser;
    }

    return;
  } catch (err: any) {
    return;
  }
};

export const logoutUser = async () => {
  // dynamic import
  const { cookies } = await import('next/headers');

  cookies().delete('session');
  return;
};

export const getAuthenticatedAppForUser =
  async (): Promise<FirebaseApp | null> => {
    // handle client side call
    if (typeof window !== 'undefined') {
      return firebaseApp;
    }

    const session = await getAppRouterSession();

    if (!session) return null;

    // dynamic import
    const { getAuth: getAdminAuth } = await import('firebase-admin/auth');

    const adminApp = customInitApp();
    const adminAuth = getAdminAuth(adminApp);

    const decodedIdToken = await adminAuth.verifySessionCookie(session);

    const app = initializeAuthenticatedApp(decodedIdToken.uid);
    const auth = getAuth(app);

    // handle revoked tokens
    const isRevoked = !(await adminAuth
      .verifySessionCookie(session, true)
      .catch((e) => console.error(e.message)));

    if (isRevoked) return null;

    // authenticate with custom token
    if (auth.currentUser?.uid !== decodedIdToken.uid) {
      // TODO(jamesdaniels) get custom claims
      const customToken = await adminAuth
        .createCustomToken(decodedIdToken.uid)
        .catch((e) => console.error(e.message));

      if (!customToken) return null;

      await signInWithCustomToken(auth, customToken);
    }

    return app;
  };

async function getAppRouterSession() {
  // dynamic import
  const { cookies } = await import('next/headers');

  try {
    return cookies().get('session')?.value;
  } catch (error) {
    return undefined;
  }
}

function initializeAuthenticatedApp(uid: string) {
  const random = Math.random().toString(36).split('.')[1];
  const appName = `authenticated-context:${uid}:${random}`;

  const app = initializeApp(firebaseConfig, appName);

  return app;
}
