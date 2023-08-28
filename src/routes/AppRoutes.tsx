import { useRoutes } from "react-router-dom";
import { NAVIGATION_ROUTES } from "./routes.constant";
import ListingPage from "@soaltee-loyalty/pages/Listing";
import Login from "@soaltee-loyalty/pages/Auth/login";
import Dashboard from "@soaltee-loyalty/pages/Dashboard";
import Signup from "../pages/Auth/signup";
const routes = [
  { path: NAVIGATION_ROUTES.DASHBOARD, element: <Dashboard /> },
  { path: NAVIGATION_ROUTES.MEMBER, Element: <Signup /> },
  { path: NAVIGATION_ROUTES.VOUCHER, Element: <Login /> },
  // { path: NAVIGATION_ROUTES.REPORT, Element: <Dashboard /> },
  // { path: NAVIGATION_ROUTES.MASTER, Element: <Signup /> },
  // { path: NAVIGATION_ROUTES.CONFIGURATION, Element: <Signup /> },
  // { path: NAVIGATION_ROUTES.SETTINGS, Element: <Dashboard /> },
  {
    path: NAVIGATION_ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: NAVIGATION_ROUTES.SIGNUP,
    element: <Signup />,
  },
  {
    path: NAVIGATION_ROUTES.PRODUCTS,
    element: <ListingPage />,
  },
];

const AppRoutes = () => {
  return useRoutes(routes);
};

export default AppRoutes;
