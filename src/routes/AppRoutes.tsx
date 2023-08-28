import { useRoutes } from "react-router-dom";
import { NAVIGATION_ROUTES } from "./routes.constant";
import Dashboard from "src/pages/Dashboard";
import Signup from "../pages/Auth/signup";
import Login from "../pages/Auth/Login";
const routes = [
  { path: NAVIGATION_ROUTES.DASHBOARD, element: <Dashboard /> },
  { path: NAVIGATION_ROUTES.MEMBER, Element: <Signup /> },
  { path: NAVIGATION_ROUTES.VOUCHER, Element: <Login /> },
  // { path: NAVIGATION_ROUTES.REPORT, Element: <Dashboard /> },
  // { path: NAVIGATION_ROUTES.MASTER, Element: <Signup /> },
  // { path: NAVIGATION_ROUTES.CONFIGURATION, Element: <Signup /> },
  // { path: NAVIGATION_ROUTES.SETTINGS, Element: <Dashboard /> },

  {
    path: NAVIGATION_ROUTES.SIGNUP,
    element: <Signup />,
  },
];

const AppRoutes = () => {
  return useRoutes(routes);
};

export default AppRoutes;
