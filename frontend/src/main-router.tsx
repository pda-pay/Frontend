import { createBrowserRouter } from "react-router-dom";
import ApproachPage from "./routes/approach/ApproachPage";
//import MydataAgreePage from "./routes/agree/MydataAgreePage";
import JoinPage from "./routes/loginnjoin/JoinPage";
import LoginPage from "./routes/loginnjoin/LoginPage";
import MenubarLayout from "./components/MenubarLayout";
import MainPage from "./routes/main/MainPage";
import PaymentPage from "./routes/payment/PaymentPage";
import AllmenuPage from "./routes/allmenu/AllmenuPage";
import AssetPage from "./routes/asset/AssetPage";
import ServiceAgreePage from "./routes/agree/ServiceAgreePage";
import PriorityPage from "./routes/priority/PriorityPage";
import SettingLimitPage from "./routes/settinglimit/SettingLimitPage";
import StockPage from "./routes/stock/StockPage";
import SettingAccountPage from "./routes/account/SettingAccountPage";
import SettingDatePage from "./routes/paymentdate/SettingDatePage";
import ConfirmPage from "./routes/confirm/ConfirmPage";
import SimplePage from "./routes/simplepsw/SimplePage";
import PaymentHistoryPage from "./routes/payment/PaymentHistoryPage";
import CashRepayPage from "./routes/repay/CashRepayPage";
import MortgagedRepayPage from "./routes/repay/MortgagedRepayPage";
import NotificationBox from "./routes/notificationBox/NotificationBox";

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

const requestFCMToken = async () => {
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

requestFCMToken();

const routers = [
  {
    path: "/",
    element: <ApproachPage />,
    // index: true
  },
  // {
  //   path: "/mydata",
  //   element: <MydataAgreePage />,
  // },
  {
    path: "/serviceagree",
    element: <ServiceAgreePage />,
  },
  {
    path: "/join",
    element: <JoinPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/main",
    element: <MenubarLayout />,
    children: [
      {
        path: "",
        element: <MainPage />,
        index: true,
      },
    ],
  },
  {
    path: "/payment",
    element: <MenubarLayout />,
    children: [
      {
        path: "",
        element: <PaymentPage />,
        index: true,
      },
    ],
  },
  {
    path: "/asset",
    element: <MenubarLayout />,
    children: [
      {
        path: "",
        element: <AssetPage />,
        index: true,
      },
    ],
  },
  {
    path: "/allmenu",
    element: <MenubarLayout />,
    children: [
      {
        path: "",
        element: <AllmenuPage />,
        index: true,
      },
    ],
  },
  {
    path: "/stock",
    element: <StockPage />,
  },
  {
    path: "/priority",
    element: <PriorityPage />,
  },
  {
    path: "/limit",
    element: <SettingLimitPage />,
  },
  {
    path: "/account",
    element: <SettingAccountPage />,
  },
  {
    path: "/paymentdate",
    element: <SettingDatePage />,
  },
  {
    path: "/confirm",
    element: <ConfirmPage />,
  },
  {
    path: "/simple",
    element: <SimplePage />,
  },
  {
    path: "/paymenthistory",
    element: <PaymentHistoryPage />,
  },
  {
    path: "/cashrepay",
    element: <CashRepayPage />,
  },
  {
    path: "/mortgagedrepay",
    element: <MortgagedRepayPage />,
  },
  {
    path: "/notificationBox",
    element: <NotificationBox />,
  },
];

const router = createBrowserRouter(routers);

export default router;
