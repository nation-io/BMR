import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

import { db } from '@/lib/firebaseClient';

import { UserData } from './models';

export const getOrCreateUser = async (wallet: string) => {
  const registrationsRef = collection(db, 'users');
  const q = query(registrationsRef, where('wallet', '==', wallet));
  const querySnapshot = await getDocs(q);
  const objects = querySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id } as UserData;
  });
  if (objects.length > 0) {
    return objects[0];
  }
  const docRef = await addDoc(collection(db, 'users'), {
    wallet: wallet,
  });
  const docSnap = await getDoc(docRef);
  return docSnap.exists()
    ? ({ ...docSnap.data(), id: docSnap.id } as UserData)
    : null;
};

export const updateUser = async (wallet: string, email: string) => {
  const registrationsRef = collection(db, 'users');
  const q = query(registrationsRef, where('wallet', '==', wallet));
  const querySnapshot = await getDocs(q);
  const objects = querySnapshot.docs;
  if (objects.length != 1) {
    return null;
  }
  await updateDoc(objects[0].ref, {
    email: email,
  });
  return objects[0].id;
};

export const updateToken = async (wallet: string, token: string) => {
  const registrationsRef = collection(db, 'users');
  const q = query(registrationsRef, where('wallet', '==', wallet));
  const querySnapshot = await getDocs(q);
  const objects = querySnapshot.docs;
  if (objects.length != 1) {
    return null;
  }
  await updateDoc(objects[0].ref, {
    token: token,
  });
  return objects[0].id;
};

export const pickUsers = async (usersNumber: number) => {
  const registrationsRef = collection(db, 'users');
  const q = query(registrationsRef, where(`token`, '!=', null));
  const querySnapshot = await getDocs(q);
  const objects = querySnapshot.docs;
  return objects.slice(0, usersNumber).map((doc) => {
    return { ...doc.data(), id: doc.id } as UserData;
  });
};
