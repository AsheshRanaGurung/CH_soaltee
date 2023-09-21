import { colors } from "@src/theme/colors";
import styled from "styled-components";
const SpinnerStyled = styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
  }
    .spinner {
      display: block;
      width: 70px;
      height: 70px;
      border: 7px solid ${colors.light_red};
      border-radius: 50%;
      border-top-color: ${colors.primary};
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to {
        -webkit-transform: rotate(360deg);
      }
    }
`;

const Spinner = () => {
  return (
    <SpinnerStyled>
      {" "}
      <div className="spinner"></div>
    </SpinnerStyled>
  );
};

export default Spinner;
