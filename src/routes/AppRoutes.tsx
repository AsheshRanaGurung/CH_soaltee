import { useRoutes } from "react-router-dom";
import { NAVIGATION_ROUTES } from "./routes.constant";
import Login from "@soaltee-loyalty/pages/Auth/login";
import Dashboard from "@soaltee-loyalty/pages/Dashboard";
import Signup from "../pages/Auth/signup";
import PropertyPage from "@soaltee-loyalty/pages/MasterData/Property";
import MemberPage from "@soaltee-loyalty/pages/MasterData/Member";
import SetPassword from "@soaltee-loyalty/pages/Auth/set-password";
import Verification from "@soaltee-loyalty/pages/Auth/verification";
import PrivateRoute from "./privateRoute";
import RestrictedRoute from "./restrictedRoute";
const routes = [
  {
    path: NAVIGATION_ROUTES.DASHBOARD,
    element: <PrivateRoute Component={Dashboard} />,
  },
  { path: NAVIGATION_ROUTES.MEMBER, Element: <Signup /> },
  {
    path: NAVIGATION_ROUTES.VOUCHER,
    Element: <Login />,
  },
  // { path: NAVIGATION_ROUTES.REPORT, Element: <Dashboard /> },
  // { path: NAVIGATION_ROUTES.MASTER, Element: <Signup /> },
  // { path: NAVIGATION_ROUTES.CONFIGURATION, Element: <Signup /> },
  // { path: NAVIGATION_ROUTES.SETTINGS, Element: <Dashboard /> },
  {
    path: NAVIGATION_ROUTES.LOGIN,
    element: <RestrictedRoute Component={Login} />,
  },
  {
    path: NAVIGATION_ROUTES.SIGNUP,
    element: <RestrictedRoute Component={Signup} />,
  },
  {
    path: NAVIGATION_ROUTES.MEMBERTIER,
    element: <PrivateRoute Component={MemberPage} />,
  },
  {
    path: NAVIGATION_ROUTES.SETPASSWORD,
    element: <RestrictedRoute Component={SetPassword} />,
  },

  {
    path: NAVIGATION_ROUTES.PROPERTY,
    element: <PrivateRoute Component={PropertyPage} />,
  },
  {
    path: NAVIGATION_ROUTES.SUCCESS,
    element: <RestrictedRoute Component={Verification} />,
  },
];

const AppRoutes = () => {
  return useRoutes(routes);
};

export default AppRoutes;
