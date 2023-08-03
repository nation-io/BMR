import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

import { db } from '@/lib/firebaseClient';

import { TicketData } from '@/services/models';

export const createTicket = async ({
  mint,
  user,
  candyMachineId,
  referral,
}: {
  mint: string;
  user: string;
  candyMachineId: string;
  referral?: string;
}) => {
  const registrationsRef = collection(db, 'tickets');
  const q = query(registrationsRef, where('mint', '==', mint));
  const querySnapshot = await getDocs(q);
  const objects = querySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id } as TicketData;
  });
  if (objects.length > 0) {
    return objects[0];
  }
  const docRef = await addDoc(collection(db, 'tickets'), {
    mint,
    user,
    candyMachineId,
    referral,
    timestamp: Date.now().toString(),
  });
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as TicketData) : null;
};
