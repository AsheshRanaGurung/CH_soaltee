import { Navigate } from "react-router-dom";
import { NAVIGATION_ROUTES } from "./routes.constant";
import jwt_decode from "jwt-decode";
import { DecodedToken } from "@src/interface/decodedToken";

const RestrictedRoute = ({ Component }: any) => {
  const isAuthenticated = localStorage.getItem("token");
  const role = isAuthenticated && jwt_decode<DecodedToken>(isAuthenticated);
  if (isAuthenticated) {
    if (role && role?.role?.length > 0 && !role.role.includes("USER")) {
      return <Navigate to={NAVIGATION_ROUTES.DASHBOARD} />;
    } else {
      return <Navigate to={NAVIGATION_ROUTES.USER_DASHBOARD} />;
    }
  }
  return <div>{<Component />}</div>;
};
export default RestrictedRoute;
