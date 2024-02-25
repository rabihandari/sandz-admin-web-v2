'use server';

import { Iuser } from '@/types';
import { cookies } from 'next/headers';
import { initializeApp } from 'firebase/app';
import { USERS_COLLECTION } from '@/constants';
import { customInitApp } from '../lib/firebase-admin-config';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { appAuth, firebaseApp, firebaseConfig } from '@/lib/firebase-config';
import { getFirestore as getAdminFirestore } from 'firebase-admin/firestore';

export const loginUser = async (token: string): Promise<Iuser | undefined> => {
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

  const sessionCookie = await adminAuth.createSessionCookie(token, {
    expiresIn,
  });

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
  const token = cookies().get('session')?.value;

  try {
    if (!token) return;

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
  cookies().delete('session');
  return;
};

export async function getAuthenticatedAppForUser(
  session: string | undefined = undefined,
) {
  if (typeof window !== 'undefined') {
    return { app: firebaseApp, user: appAuth.currentUser?.toJSON() };
  }

  const adminApp = customInitApp();

  const adminAuth = getAdminAuth(adminApp);
  const noSessionReturn = { app: null, currentUser: null };

  if (!session) {
    // if no session cookie was passed, try to get from next/headers for app router
    session = await getAppRouterSession();

    if (!session) return noSessionReturn;
  }

  const decodedIdToken = await adminAuth.verifySessionCookie(session);

  const app = initializeAuthenticatedApp(decodedIdToken.uid);
  const auth = getAuth(app);

  // handle revoked tokens
  const isRevoked = !(await adminAuth
    .verifySessionCookie(session, true)
    .catch((e) => console.error(e.message)));
  if (isRevoked) return noSessionReturn;

  // authenticate with custom token
  if (auth.currentUser?.uid !== decodedIdToken.uid) {
    // TODO(jamesdaniels) get custom claims
    const customToken = await adminAuth
      .createCustomToken(decodedIdToken.uid)
      .catch((e) => console.error(e.message));

    if (!customToken) return noSessionReturn;

    await signInWithCustomToken(auth, customToken);
  }

  return { app, currentUser: auth.currentUser };
}

async function getAppRouterSession() {
  // dynamically import to prevent import errors in pages router
  const { cookies } = await import('next/headers');

  try {
    return cookies().get('session')?.value;
  } catch (error) {
    // cookies() throws when called from pages router
    return undefined;
  }
}

function initializeAuthenticatedApp(uid: string) {
  const random = Math.random().toString(36).split('.')[1];
  const appName = `authenticated-context:${uid}:${random}`;

  const app = initializeApp(firebaseConfig, appName);

  return app;
}
