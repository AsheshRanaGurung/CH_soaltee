import { Navigate } from "react-router-dom";
import { NAVIGATION_ROUTES } from "./routes.constant";

const RestrictedRoute = ({ Component }: any) => {
  const isAuthenticated = localStorage.getItem("loginToken");
  if (isAuthenticated) {
    return <Navigate to={NAVIGATION_ROUTES.DASHBOARD} />;
  }

  return <div>{<Component />}</div>;
};
export default RestrictedRoute;
