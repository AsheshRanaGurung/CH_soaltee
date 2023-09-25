import { useNavigate } from "react-router-dom";
import { NAVIGATION_ROUTES } from "./routes.constant";
import Layout from "@src/components/organisms/layout";
import jwt_decode from "jwt-decode";
import { DecodedToken } from "@src/interface/decodedToken";
import { useEffect } from "react";
import { UserLayout } from "@src/components/organisms/user-layout";

const PrivateRoute = ({ Component, allowedRoles }: any) => {
  const isAuthenticated = localStorage.getItem("token");
  const navigate = useNavigate();
  const role = isAuthenticated && jwt_decode<DecodedToken>(isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(NAVIGATION_ROUTES.LOGIN);
      return;
    }

    if (isAuthenticated) {
      if (
        role &&
        role?.role?.length > 0 &&
        !role.role.some((userRole: any) => allowedRoles.includes(userRole))
      ) {
        navigate(NAVIGATION_ROUTES.NOT_FOUND);
        return;
      }
    }
  }, [isAuthenticated]);
  return (
    <div>
      {role && role?.role?.length > 0 && !role.role.includes("USER") ? (
        <Layout role={role.role}>
          <Component />
        </Layout>
      ) : (
        <UserLayout>
          <Component />
        </UserLayout>
      )}
    </div>
  );
};
export default PrivateRoute;
