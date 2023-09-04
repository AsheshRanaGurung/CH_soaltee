import { useRoutes } from "react-router-dom";
import { NAVIGATION_ROUTES } from "./routes.constant";
import Login from "@src/pages/Auth/login";
import Dashboard from "@src/pages/Dashboard";
import Signup from "../pages/Auth/signup";
import PropertyPage from "@src/pages/MasterData/Property";
import MemberPage from "@src/pages/MasterData/Member";
import SetPassword from "@src/pages/Auth/set-password";
import Verification from "@src/pages/Auth/verification";
import PrivateRoute from "./privateRoute";
import RestrictedRoute from "./restrictedRoute";
import UserDashboard from "@src/userPages/UserDashboard";
import ServicePage from "@src/pages/PointConfig/Service";
import MemberManagementPage from "@src/pages/MemberManagement";
import ProfileDetail from "@src/pages/MemberManagement/ProfileDetail";
import ForgotPasswordPage from "@src/pages/Auth/forgot-password";

const routes = [
  {
    path: NAVIGATION_ROUTES.DASHBOARD,
    element: <PrivateRoute Component={Dashboard} />,
  },
  {
    path: NAVIGATION_ROUTES.USER_DASHBOARD,
    element: <PrivateRoute Component={UserDashboard} />,
  },
  {
    path: NAVIGATION_ROUTES.VOUCHER,
    Element: <Login />,
  },

  {
    path: NAVIGATION_ROUTES.SERVICE,
    element: <PrivateRoute Component={ServicePage} />,
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
  {
    path: NAVIGATION_ROUTES.MEMBER_MANAGEMENT,
    element: <PrivateRoute Component={MemberManagementPage} />,
  },
  {
    path: NAVIGATION_ROUTES.PROFILE_DETAIL,
    element: <PrivateRoute Component={ProfileDetail} />,
  },
  {
    path: NAVIGATION_ROUTES.FORGOT_PASSWORD,
    element: <RestrictedRoute Component={ForgotPasswordPage} />,
  },
];

const AppRoutes = () => {
  return useRoutes(routes);
};

export default AppRoutes;
