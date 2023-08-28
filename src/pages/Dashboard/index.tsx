import ImageSlider from "@soaltee-loyalty/components/molecules/image-slider";
import { BreadCrumb } from "@soaltee-loyalty/components/atoms/Breadcrumb";

const Dashboard = () => {
  return (
    <>
      <BreadCrumb
        items={[
          { name: "Dashboard", route: "#" },
          { name: "List", route: "#" },
        ]}
      />
      <div>
        <ImageSlider />
      </div>
    </>
  );
};

export default Dashboard;
