import { BreadCrumb } from "src/components/atoms/Breadcrumb";

const Dashboard = () => {
  return (
    <>
      <BreadCrumb
        items={[
          { name: "Dashboard", route: "#" },
          { name: "List", route: "#" },
        ]}
      />
      <div>Dashboard</div>
    </>
  );
};

export default Dashboard;
