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
import BonusPage from "@src/pages/PointConfig/Bonus";
import ForgotPasswordPage from "@src/pages/Auth/forgot-password";
import ProfilePage from "@src/components/templates/user/Profile";
import ReportPage from "@src/pages/Report";
import VoucherPage from "@src/pages/Voucher";
import VoucherAdd from "@src/pages/Voucher/add";
import OfferPage from "@src/pages/Offers";
import StaffManagementPage from "@src/pages/StaffManagement";
import PageNotFound from "@src/pages/NotFound";

const routes = [
  {
    path: NAVIGATION_ROUTES.DASHBOARD,
    element: (
      <PrivateRoute
        Component={Dashboard}
        allowedRoles={["SUPERADMIN", "ADMIN"]}
      />
    ),
  },
  {
    path: NAVIGATION_ROUTES.USER_DASHBOARD,
    element: <PrivateRoute Component={UserDashboard} allowedRoles={["USER"]} />,
  },

  {
    path: NAVIGATION_ROUTES.SERVICE,
    element: (
      <PrivateRoute
        Component={ServicePage}
        allowedRoles={["SUPERADMIN", "ADMIN"]}
      />
    ),
  },
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
    element: (
      <PrivateRoute
        Component={MemberPage}
        allowedRoles={["SUPERADMIN", "ADMIN"]}
      />
    ),
  },
  {
    path: NAVIGATION_ROUTES.SETPASSWORD,
    element: <RestrictedRoute Component={SetPassword} />,
  },

  {
    path: NAVIGATION_ROUTES.PROPERTY,
    element: (
      <PrivateRoute
        Component={PropertyPage}
        allowedRoles={["SUPERADMIN", "ADMIN"]}
      />
    ),
  },
  {
    path: NAVIGATION_ROUTES.SUCCESS,
    element: <RestrictedRoute Component={Verification} />,
  },

  {
    path: NAVIGATION_ROUTES.MEMBER_MANAGEMENT,
    element: (
      <PrivateRoute
        Component={MemberManagementPage}
        allowedRoles={["SUPERADMIN", "ADMIN"]}
      />
    ),
  },
  {
    path: NAVIGATION_ROUTES.PROFILE_DETAIL,
    element: (
      <PrivateRoute
        Component={ProfileDetail}
        allowedRoles={["SUPERADMIN", "ADMIN"]}
      />
    ),
  },
  {
    path: NAVIGATION_ROUTES.BONUS,
    element: (
      <PrivateRoute
        Component={BonusPage}
        allowedRoles={["SUPERADMIN", "ADMIN"]}
      />
    ),
  },
  {
    path: NAVIGATION_ROUTES.FORGOT_PASSWORD,
    element: <RestrictedRoute Component={ForgotPasswordPage} />,
  },
  {
    path: NAVIGATION_ROUTES.USER_PROFILE,
    element: <PrivateRoute Component={ProfilePage} allowedRoles={["USER"]} />,
  },
  {
    path: NAVIGATION_ROUTES.REPORT,
    element: (
      <PrivateRoute
        Component={ReportPage}
        allowedRoles={["SUPERADMIN", "ADMIN"]}
      />
    ),
  },
  {
    path: NAVIGATION_ROUTES.VOUCHER,
    element: (
      <PrivateRoute
        Component={VoucherPage}
        allowedRoles={["SUPERADMIN", "ADMIN"]}
      />
    ),
  },
  {
    path: NAVIGATION_ROUTES.VOUCHER_ADD,
    element: (
      <PrivateRoute
        Component={VoucherAdd}
        allowedRoles={["SUPERADMIN", "ADMIN"]}
      />
    ),
  },
  {
    path: NAVIGATION_ROUTES.OFFER,
    element: (
      <PrivateRoute
        Component={OfferPage}
        allowedRoles={["SUPERADMIN", "ADMIN"]}
      />
    ),
  },
  {
    path: NAVIGATION_ROUTES.NOT_FOUND,
    element: <RestrictedRoute Component={PageNotFound} />,
  },
  {
    path: NAVIGATION_ROUTES.STAFF_MANAGEMENT,
    element: (
      <PrivateRoute
        Component={StaffManagementPage}
        allowedRoles={["SUPERADMIN", "ADMIN"]}
      />
    ),
  },
];

const AppRoutes = () => {
  return useRoutes(routes);
};

export default AppRoutes;
