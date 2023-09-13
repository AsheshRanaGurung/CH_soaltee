import { Box } from "@chakra-ui/react";
import { NoDataAvailableIcon } from "@src/assets/svgs";
import { colors } from "@src/theme/colors";
import styled from "styled-components";

interface NoDataAvailableProps {
  content: string;
}
const ContentStyled = styled.div`
  color: ${colors.secondary_dark};
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const NoDataAvailable: React.FC<NoDataAvailableProps> = ({ content }) => {
  return (
    <ContentStyled>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <NoDataAvailableIcon />
        <div>{content}</div>
      </Box>
    </ContentStyled>
  );
};

export default NoDataAvailable;
