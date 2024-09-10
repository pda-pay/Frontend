import { createBrowserRouter } from "react-router-dom";
import ApproachPage from "./routes/approach/ApproachPage";
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
import ScannerPage from "./routes/scanner/ScannerPage";
import TransactionFailPage from "./routes/scanner/TransactionFailPage";
import TransactionSuccessPage from "./routes/scanner/TransactionSuccessPage";
import PaymentPasswordPage from "./routes/scanner/PaymentPasswordPage";
import FranchiseQrCreatePage from "./routes/franchise/FranchiseQrCreatePage";
import QRPage from "./routes/franchise/QRPage";
import FranchiseLoginPage from "./routes/franchise/FranchiseLoginPage";
import PaymentHistoryPage from "./routes/payment/PaymentHistoryPage";
import AdminPage from "./routes/admin/AdminPage";
import CashRepayPage from "./routes/repay/CashRepayPage";
import MortgagedRepayPage from "./routes/repay/MortgagedRepayPage";
import NotificationBox from "./routes/notificationBox/NotificationBox";
import ProtectedPages from "./ProtectedPages";

import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import RepaymentHistoryPage from "./routes/repaymentHistory/RepaymentHistoryPage";
import MydataAgreePage from "./routes/agree/MydataAgreePage";

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

export const requestFCMToken = async () => {
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    try {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
      return token;
    } catch (error) {
      console.error("FCM Token error:", error);
    }
  } else if (permission === "denied") {
    console.log("You denied the notification permission");
  }
};

const routers = [
  {
    path: "/",
    element: <ApproachPage />,
  },
  {
    path: "/serviceagree",
    //element: <ServiceAgreePage />,
    element: <ProtectedPages element={<ServiceAgreePage />} />,
  },
  {
    path: "/mydata",
    element: <MydataAgreePage />,
  },
  {
    path: "/join",
    element: <JoinPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  // {
  //   path: "/main",
  //   element: <MenubarLayout />,
  //   children: [
  //     {
  //       path: "",
  //       element: <MainPage />,
  //       index: true,
  //     },
  //   ],
  // },
  {
    path: "/franchise/login",
    element: <FranchiseLoginPage />,
  },
  {
    path: "/franchise/createqr",
    element: <FranchiseQrCreatePage />,
  },
  {
    path: "/franchise/qr",
    element: <QRPage />,
  },
  {
    path: "/main",
    element: <ProtectedPages />, // ProtectedRoute를 부모 요소로 사용
    children: [
      {
        path: "",
        element: <MenubarLayout />, // MenubarLayout은 ProtectedRoute 내부에 렌더링됨
        children: [
          {
            path: "",
            element: <MainPage />, // 기본 자식 라우트
            index: true,
          },
        ],
      },
    ],
  },
  // {
  //   path: "/payment",
  //   element: <MenubarLayout />,
  //   children: [
  //     {
  //       path: "",
  //       element: <PaymentPage />,
  //       index: true,
  //     },
  //   ],
  // },
  {
    path: "/payment",
    element: <ProtectedPages />,
    children: [
      {
        path: "",
        element: <MenubarLayout />,
        children: [
          {
            path: "",
            element: <PaymentPage />,
            index: true,
          },
        ],
      },
    ],
  },
  // {
  //   path: "/asset",
  //   element: <MenubarLayout />,
  //   children: [
  //     {
  //       path: "",
  //       element: <AssetPage />,
  //       index: true,
  //     },
  //   ],
  // },
  {
    path: "/asset",
    element: <ProtectedPages />,
    children: [
      {
        path: "",
        element: <MenubarLayout />,
        children: [
          {
            path: "",
            element: <AssetPage />,
            index: true,
          },
        ],
      },
    ],
  },
  // {
  //   path: "/allmenu",
  //   element: <MenubarLayout />,
  //   children: [
  //     {
  //       path: "",
  //       element: <AllmenuPage />,
  //       index: true,
  //     },
  //   ],
  // },
  {
    path: "/allmenu",
    element: <ProtectedPages />,
    children: [
      {
        path: "",
        element: <MenubarLayout />,
        children: [
          {
            path: "",
            element: <AllmenuPage />,
            index: true,
          },
        ],
      },
    ],
  },
  {
    path: "/scanner",
    //element: <ScannerPage />,
    element: <ProtectedPages element={<ScannerPage />} />,
  },
  {
    path: "/transaction-fail-result",
    //element: <TransactionFailPage />,
    element: <ProtectedPages element={<TransactionFailPage />} />,
  },
  {
    path: "/transaction-success-result",
    //element: <TransactionSuccessPage />,
    element: <ProtectedPages element={<TransactionSuccessPage />} />,
  },
  {
    path: "/payment-pw-verify",
    //element: <PaymentPasswordPage />,
    element: <ProtectedPages element={<PaymentPasswordPage />} />,
  },
  {
    path: "/stock",
    //element: <StockPage />,
    element: <ProtectedPages element={<StockPage />} />,
  },
  {
    path: "/priority",
    //element: <PriorityPage />,
    element: <ProtectedPages element={<PriorityPage />} />,
  },
  {
    path: "/limit",
    //element: <SettingLimitPage />,
    element: <ProtectedPages element={<SettingLimitPage />} />,
  },
  {
    path: "/account",
    //element: <SettingAccountPage />,
    element: <ProtectedPages element={<SettingAccountPage />} />,
  },
  {
    path: "/paymentdate",
    //element: <SettingDatePage />,
    element: <ProtectedPages element={<SettingDatePage />} />,
  },
  {
    path: "/confirm",
    //element: <ConfirmPage />,
    element: <ProtectedPages element={<ConfirmPage />} />,
  },
  {
    path: "/simple",
    //element: <SimplePage />,
    element: <ProtectedPages element={<SimplePage />} />,
  },
  {
    path: "/paymenthistory",
    //element: <PaymentHistoryPage />,
    element: <ProtectedPages element={<PaymentHistoryPage />} />,
  },
  {
    path: "/cashrepay",
    //element: <CashRepayPage />,
    element: <ProtectedPages element={<CashRepayPage />} />,
  },
  {
    path: "/mortgagedrepay",
    //element: <MortgagedRepayPage />,
    element: <ProtectedPages element={<MortgagedRepayPage />} />,
  },
  {
    path: "/notificationBox",
    //element: <NotificationBox />,
    element: <ProtectedPages element={<NotificationBox />} />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/repayment-history",
    element: <ProtectedPages element={<RepaymentHistoryPage />} />,
  },
];

const router = createBrowserRouter(routers);

export default router;
