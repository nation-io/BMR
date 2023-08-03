import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import * as localforage from 'localforage';

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
});
export const getFirebaseToken = async () => {
  if ('serviceWorker' in navigator) {
    const messaging = getMessaging(app);
    const permission = await Notification.requestPermission();
    try {
      if (permission === 'granted') {
        const tokenInLocalForage = await localforage.getItem('fcm_token');
        if (tokenInLocalForage !== null) {
          return tokenInLocalForage as string;
        }

        const token = await getToken(messaging, {
          vapidKey:
            'BDAzlQXZyxdAMl4-JIiKekpcYoxvsUhDDl-QWkclYw8Yh8pySEaADVANVEUdt4KmcSMRv4AY8mPwW5D6bBLrnXQ',
        });
        if (token) {
          await localforage.setItem('fcm_token', token);
          return token;
        }
      }
    } catch (e) {
      return '';
    }
  }
  return '';
};
export const onMessageListener = () =>
  new Promise((resolve) => {
    const messaging = getMessaging(app);
    onMessage(messaging, (payload) => {
      resolve(payload.data);
    });
  });
