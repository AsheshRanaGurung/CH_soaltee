import { Text } from "@chakra-ui/react";
import { colors } from "@src/theme/colors";

export const TableTitle = ({ currentText }: { currentText: string }) => {
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