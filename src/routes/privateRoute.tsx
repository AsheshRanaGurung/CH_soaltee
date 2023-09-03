import { useNavigate } from "react-router-dom";
import { NAVIGATION_ROUTES } from "./routes.constant";
import Layout from "@src/components/organisms/layout";
import jwt_decode from "jwt-decode";
import { DecodedToken } from "@src/interface/decodedToken";
import { useEffect } from "react";

const PrivateRoute = ({ Component }: any) => {
  const isAuthenticated = localStorage.getItem("token");
  const navigate = useNavigate();
  const role = isAuthenticated && jwt_decode<DecodedToken>(isAuthenticated);

  useEffect(() => {
    console.log("hitt");
    if (!isAuthenticated) {
      navigate(NAVIGATION_ROUTES.LOGIN);
      return;
    }
    if (isAuthenticated) {
      role && role?.role?.length > 0 && !role.role.includes("USER")
        ? navigate(NAVIGATION_ROUTES.DASHBOARD)
        : navigate(NAVIGATION_ROUTES.USER_DASHBOARD);
    }
  }, [isAuthenticated]);

  return (
    <div>
      {role && role?.role?.length > 0 && !role.role.includes("USER") ? (
        <Layout>
          <Component />
        </Layout>
      ) : (
        <Component />
      )}
    </div>
  );
};
export default PrivateRoute;
