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
import PriorityPage from "./routes/priority/PriorityPage";
import SettingLimitPage from "./routes/settinglimit/SettingLimitPage";
import StockPage from "./routes/stock/StockPage";
import SettingAccountPage from "./routes/account/SettingAccountPage";
import SettingDatePage from "./routes/paymentdate/SettingDatePage";
import ConfirmPage from "./routes/confirm/ConfirmPage";

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
];

const router = createBrowserRouter(routers);

export default router;
