import { Text } from "@chakra-ui/react";
import { colors } from "@soaltee-loyalty/theme/colors";
export const TableHeading = ({ currentText }: any) => {
  return (
    <>
      {currentText && (
        <Text
          as="h2"
          color={colors.primary}
          fontWeight="600"
          borderRadius={"5px"}
        >
          {currentText}
        </Text>
      )}
    </>
  );
};
