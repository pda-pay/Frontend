import { initializeApp } from "firebase/app";
import { getMessaging, Messaging } from "firebase/messaging";
//import { onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: String(import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain: String(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: String(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: String(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: String(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  appId: String(import.meta.env.VITE_FIREBASE_APP_ID),
  measurementId: String(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID),
};
console.log(firebaseConfig.projectId);

const app = initializeApp(firebaseConfig);

const messaging: Messaging = getMessaging(app);

export default messaging;
