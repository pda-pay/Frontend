import { RouterProvider } from "react-router-dom";
import MainRouter from "./main-router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { getMessaging, Messaging } from "firebase/messaging";
import { useEffect } from "react";

function App() {
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
  
  const messaging: Messaging = getMessaging(app);
  
  // const fcmservice = new fcmApi();
  
  const requestFCMToken = async () => {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      try {
        const token = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        });

        console.log(token);

      } catch (error) {
        console.error("FCM Token error: ", error);
      }
    } else if (permission === "denied") {
      alert("You denied the notification permission");
    }
  };

  const onMessageListener = () => {
    onMessage(messaging, (payload) => {
      console.log("Message received. Payload:", payload);
    });
  };

  useEffect(() => {

    requestFCMToken();
    onMessageListener();
  }, []);

  return <RouterProvider router={MainRouter}></RouterProvider>;
}

export default App;
