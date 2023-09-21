import { Box } from "@chakra-ui/react";
import { CardLockIcon, CardLockTierIcon } from "@src/assets/svgs";
import styled from "styled-components";

interface IProps {
  bg_color?: string;
  tierIcon?: boolean;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  position?: string;
}

const LockStyled = styled.div<IProps>`
  .card-lock {
    background-color: ${(props) =>
      props.bg_color ? props.bg_color : "transparent"};
    position: ${(props) => props.position && props.position};
    left: ${(props) => (props.left ? `${props.left}px` : "0")};
    top: ${(props) => (props.top ? `${props.top}px` : "0")};
    width: ${(props) => (props.width ? `${props.width}px` : "0")};
    height: ${(props) => (props.height ? `${props.height}px` : "0")};
  }
`;

export const CardLock: React.FC<IProps> = ({
  bg_color,
  tierIcon,
  left,
  top,
  width,
  height,
  position,
}) => {
  return (
    <LockStyled
      bg_color={bg_color}
      left={left}
      top={top}
      width={width}
      height={height}
      position={position}
    >
      <Box
        width="63px"
        height="63px"
        borderRadius="50%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        className="card-lock"
      >
        {tierIcon ? <CardLockTierIcon /> : <CardLockIcon />}
      </Box>
    </LockStyled>
  );
};
