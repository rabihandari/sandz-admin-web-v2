export const LOCAL_STORAGE_EMAIL_KEY: string = 'email';

export const firebaseErrorMap: { [key: string]: string } = {
  'auth/invalid-credential': 'Invalid email or password.',
  'auth/session-cookie-expired': 'Session expired, please login again.',
  'Firebase: Error (auth/email-already-in-use).': 'Email already used.',
  'The email address is already in use by another account.':
    'Email already used.',

  default: 'An error occured, please try again later.',
};

export const SESSION_EXPIRED = 'session-expired';

export const errorCodes: { [key: string]: number } = {
  [SESSION_EXPIRED]: 401,
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

export const DEFAULT_PASSWORD = '123456';

// COLLECTIONS
export const USERS_COLLECTION = 'users';
export const AREAS_COLLECTION = 'areas';
export const RESERVATIONS_COLLECTION = 'reservations';
export const HUB_COLLECTION = 'hub';

// ROUTES
export const AREA_LIST_ROUTE = '/area/list';
export const CUSTOMER_LIST_ROUTE = '/customer/list';
export const VENDOR_LIST_ROUTE = '/vendor/list';

export const planOptions = [
  {
    key: 1,
    value: 'Basic',
    label: 'Basic',
  },
];

export const vendorTypeOptions = [
  {
    key: 1,
    value: 'Entertainment',
    label: 'Entertainment',
  },
  {
    key: 2,
    value: 'Catering',
    label: 'Catering',
  },
  {
    key: 3,
    value: 'Market',
    label: 'Market',
  },
];
