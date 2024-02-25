export const LOCAL_STORAGE_EMAIL_KEY: string = 'email';

export const firebaseErrorMap: { [key: string]: string } = {
  'auth/invalid-credential': 'Invalid email or password.',
  'auth/session-cookie-expired': 'Session expired.',

  default: 'An error occured, please try again later.',
};

// COLLECTIONS
export const USERS_COLLECTION = 'users';
export const AREAS_COLLECTION = 'areas';
