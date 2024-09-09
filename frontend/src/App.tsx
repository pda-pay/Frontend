import { RouterProvider } from "react-router-dom";
import MainRouter from "./main-router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestFCMToken = async () => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    try {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
      console.log("FCM Token:", token);
    } catch (error) {
      console.error("FCM Token error:", error);
    }
  } else if (permission === "denied") {
    alert("You denied the notification permission");
  }
};

onMessage(messaging, (payload) => {
  console.log("Message received. Payload:", payload);
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service worker registration succeeded:", registration);
    })
    .catch((error) => {
      console.log("Service worker registration failed:", error);
    });
}

function App() {
  return <RouterProvider router={MainRouter}></RouterProvider>;
}

export default App;