import { createBrowserRouter } from "react-router-dom";
import ApproachPage from "./routes/approach/ApproachPage";
import JoinPage from "./routes/loginnjoin/JoinPage";
import LoginPage from "./routes/loginnjoin/LoginPage";

const routers = [
  {
    path: "/",
    element: <ApproachPage />,
    // index: true
  },
  {
    path: "/join",
    element: <JoinPage />,
  },
  {
    path: "/login",
    //element: <MenubarLayout />,
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
