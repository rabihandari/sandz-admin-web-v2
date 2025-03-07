import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getApps, getApp } from 'firebase/app';
import {
  User,
  getAuth,
  NextOrObserver,
  onAuthStateChanged as _onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const appAuth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const onAuthStateChanged = (cb: NextOrObserver<User>) => {
  return _onAuthStateChanged(appAuth, cb);
};

export {
  db,
  appAuth,
  storage,
  firebaseApp,
  firebaseConfig,
  onAuthStateChanged,
};
