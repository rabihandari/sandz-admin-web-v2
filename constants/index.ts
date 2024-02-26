export const LOCAL_STORAGE_EMAIL_KEY: string = 'email';

export const firebaseErrorMap: { [key: string]: string } = {
  'auth/invalid-credential': 'Invalid email or password.',
  'auth/session-cookie-expired': 'Session expired.',

  default: 'An error occured, please try again later.',
};

export const pageSizeOptions = [
  {
    key: 1,
    value: 10,
    label: 10,
  },
  {
    key: 2,
    value: 50,
    label: 50,
  },
  {
    key: 3,
    value: 100,
    label: 100,
  },
];

// COLLECTIONS
export const USERS_COLLECTION = 'users';
export const AREAS_COLLECTION = 'areas';
