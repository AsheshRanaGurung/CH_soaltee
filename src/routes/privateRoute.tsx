import { Navigate } from "react-router-dom";
import { NAVIGATION_ROUTES } from "./routes.constant";
import Layout from "@soaltee-loyalty/components/organisms/layout";
import jwt_decode from "jwt-decode";
import { DecodedToken } from "@soaltee-loyalty/interface/decodedToken";

const PrivateRoute = ({ Component }: any) => {
  const isAuthenticated = localStorage.getItem("token");
  if (!isAuthenticated) {
    return <Navigate to={NAVIGATION_ROUTES.LOGIN} />;
  }
  const role = isAuthenticated && jwt_decode<DecodedToken>(isAuthenticated);

  console.log("role", role);
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
