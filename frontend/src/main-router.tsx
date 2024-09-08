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
import ScannerPage from "./routes/scanner/ScannerPage";
import TransactionFailPage from "./routes/scanner/TransactionFailPage";
import TransactionSuccessPage from "./routes/scanner/TransactionSuccessPage";
import PaymentPasswordPage from "./routes/scanner/PaymentPasswordPage";
import FranchiseQrCreatePage from "./routes/franchise/FranchiseQrCreatePage";
import QRPage from "./routes/franchise/QRPage";
import FranchiseLoginPage from "./routes/franchise/FranchiseLoginPage";
import PaymentHistoryPage from "./routes/payment/PaymentHistoryPage";
import CashRepayPage from "./routes/repay/CashRepayPage";
import MortgagedRepayPage from "./routes/repay/MortgagedRepayPage";
import NotificationBox from "./routes/notificationBox/NotificationBox";

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
    path: "/scanner",
    element: <ScannerPage />,
  },
  {
    path: "/transaction-fail-result",
    element: <TransactionFailPage />,
  },
  {
    path: "/transaction-success-result",
    element: <TransactionSuccessPage />,
  },
  {
    path: "/payment-pw-verify",
    element: <PaymentPasswordPage />,
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
