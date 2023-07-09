import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const adminConfig = {
   apiKey: process.env.FIREBASE_API_KEY,
   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
   projectId: process.env.FIREBASE_PROJECT_ID,
   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
   appId: process.env.FIREBASE_APP_ID,
};

export const app = initializeApp(adminConfig);
export const auth = getAuth();
export const initializeSecondApp = (config: FirebaseOptions, name: string): FirebaseApp => {
   let secondApp = initializeApp(config, name);
   return secondApp;
};

export const db = getFirestore(app);
connectFirestoreEmulator(db, '127.0.0.1', 8080);
