'use server';

import { Iuser } from '@/types';
import { cookies } from 'next/headers';
import { getDocument } from '@/firebase';
import { auth as AuthAdmin } from 'firebase-admin';
import { customInitApp } from '../utils/firebase-admin-config';

// Init the Firebase SDK every time the server is called
customInitApp();

export const loginUser = async (token: string): Promise<Iuser | undefined> => {
  const decodedToken = await AuthAdmin().verifyIdToken(token);

  if (!decodedToken) return;

  const user = (await getDocument('users', decodedToken.uid)) as
    | Iuser
    | undefined;

  if (!user || user?.role !== 'admin') return;

  const expiresIn = 60 * 60 * 24 * 14 * 1000;
  const sessionCookie = await AuthAdmin().createSessionCookie(token, {
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

  return user;
};

export const checkUserToken = async () => {
  const token = cookies().get('session');

  try {
    if (!token) return await logoutUser();

    const decodedToken = await AuthAdmin().verifySessionCookie(token?.value);

    if (decodedToken) return decodedToken;

    return await logoutUser();
  } catch (err: any) {
    return await logoutUser();
  }
};

export const logoutUser = async () => {
  cookies().delete('session');
  return;
};
