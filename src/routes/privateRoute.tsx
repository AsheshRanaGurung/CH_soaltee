import { Navigate } from "react-router-dom";
import { NAVIGATION_ROUTES } from "./routes.constant";
import Layout from "@soaltee-loyalty/components/organisms/layout";

const PrivateRoute = ({ Component }: any) => {
  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to={NAVIGATION_ROUTES.LOGIN} />;
  }

  return (
    <div>
      {
        <Layout>
          <Component />
        </Layout>
      }
    </div>
  );
};
export default PrivateRoute;
