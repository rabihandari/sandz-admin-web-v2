import { initializeApp, getApps, cert } from 'firebase-admin/app';

const ADMIN_APP_NAME = 'firebase-frameworks';

export const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
};

export function customInitApp() {
  if (getApps().length) {
    return getApps()[0];
  }

  return initializeApp(firebaseAdminConfig, ADMIN_APP_NAME);
}
