import { createBrowserRouter } from "react-router-dom";
import ApproachPage from "./routes/approach/ApproachPage";
import ButtonbarLayout from "./components/ButtonbarLayout";
import LoginPage from "./routes/login/LoginPage";

const routers = [
  {
    path: "/",
    element: <ApproachPage />,
    // index: true
  },
  {
    path: "/login",
    element: <ButtonbarLayout />,
    children: [
      {
        path: "",
        element: <LoginPage />,
        index: true,
      },
    ],
  },
];

const router = createBrowserRouter(routers);

export default router;
