// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts(
  'https://www.gstatic.com/firebasejs/9.9.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.9.0/firebase-messaging-compat.js'
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyAyaf59Oaf6dledL2bUhVq3cT7tqeu4aBg',
  authDomain: 'mail-template-c9964.firebaseapp.com',
  projectId: 'mail-template-c9964',
  storageBucket: 'mail-template-c9964.appspot.com',
  messagingSenderId: '131105574182',
  appId: '1:131105574182:web:63fdab5099d9782ea745e7',
  measurementId: 'G-TWSHCTTDES',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
