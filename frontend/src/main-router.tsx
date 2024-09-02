import { createBrowserRouter } from "react-router-dom";
import ApproachPage from "./routes/approach/ApproachPage";
import MydataAgreePage from "./routes/agree/MydataAgreePage";
import JoinPage from "./routes/loginnjoin/JoinPage";
import LoginPage from "./routes/loginnjoin/LoginPage";
import MenubarLayout from "./components/MenubarLayout";
import MainPage from "./routes/main/MainPage";
import PaymentPage from "./routes/payment/PaymentPage";
import AllmenuPage from "./routes/allmenu/AllmenuPage";
import AssetPage from "./routes/asset/AssetPage";
import ServiceAgreePage from "./routes/agree/ServiceAgreePage";
import StockCheckPage from "./routes/stockcheck/StockCheckPage";
import ScannerPage from "./routes/scanner/ScannerPage";
import TransactionFailPage from "./routes/scanner/TransactionFailPage";
import TransactionSuccessPage from "./routes/scanner/TransactionSuccessPage";
import PaymentPasswordPage from "./routes/scanner/PaymentPasswordPage";
import FranchiseQrCreatePage from "./routes/franchise/FranchiseQrCreatePage";
import QRPage from "./routes/franchise/QRPage";
import FranchiseLoginPage from "./routes/franchise/FranchiseLoginPage";

const routers = [
  {
    path: "/",
    element: <ApproachPage />,
    // index: true
  },
  {
    path: "/mydata",
    element: <MydataAgreePage />,
  },
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
    path: "/stockcheck",
    element: <StockCheckPage />,
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
];

const router = createBrowserRouter(routers);

export default router;
