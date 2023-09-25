import { Button } from "@chakra-ui/react";
import { GoBackIcon } from "@src/assets/svgs";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router

const GoBackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Button
      onClick={goBack}
      style={{
        display: "flex",
        gap: "4px",
        borderRadius: "45px",
        marginTop: "16px",
        marginBottom: "10px",
        paddingTop: "10px",
        paddingBottom: "10px",
        paddingRight: "16px",
        paddingLeft: "16px",
        alignItems: "center",
      }}
    >
      {" "}
      <GoBackIcon />
      Go Back
    </Button>
  );
};

export default GoBackButton;
