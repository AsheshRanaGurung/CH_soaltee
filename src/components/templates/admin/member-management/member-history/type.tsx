import { Text } from "@chakra-ui/layout";
import { colors } from "@src/theme/colors";

const Type = ({ type }: any) => {
  const serviceTyleText = () => {
    switch (type) {
      case "MANUALLY":
        return <Text color={colors.secondary_dark}>Point Added</Text>;
      case "SERVICE":
        return <Text color={colors.secondary_dark}>Point Added</Text>;
      default:
        return <Text color={colors.secondary_dark}>Point Deducted</Text>;
    }
  };
  return serviceTyleText();
};
export default Type;
