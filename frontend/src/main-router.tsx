import { createBrowserRouter } from "react-router-dom";
import ApproachPage from "./routes/approach/ApproachPage";
import MenubarLayout from "./components/MenubarLayout";
import LoginPage from "./routes/login/LoginPage";

const routers = [
  {
    path: "/",
    element: <ApproachPage />,
    // index: true
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
