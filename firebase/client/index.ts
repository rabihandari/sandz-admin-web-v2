'use client';

import { v4 as uuidv4 } from 'uuid';
import { storage } from '@/lib/firebase-config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

export const uploadImage = async (folder: string, image: File) => {
  const filePath = `${folder}/${uuidv4()}.${image.name.split('.').at(-1)}`;

  const newImageRef = ref(storage, filePath);
  await uploadBytesResumable(newImageRef, image);

  return await getDownloadURL(newImageRef);
};
