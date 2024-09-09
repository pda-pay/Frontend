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
import PaymentHistoryPage from "./routes/payment/PaymentHistoryPage";
import CashRepayPage from "./routes/repay/CashRepayPage";
import MortgagedRepayPage from "./routes/repay/MortgagedRepayPage";
import NotificationBox from "./routes/notificationBox/NotificationBox";
import ProtectedPages from "./ProtectedPages";

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
];

const router = createBrowserRouter(routers);

export default router;
