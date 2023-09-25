import { Button, HStack, Text } from "@chakra-ui/react";
import { colors } from "@src/theme/colors";
import { forwardRef } from "react";

const CopyWithTextButton = forwardRef(
  (
    {
      textToCopy,
      buttonText,
      isClicked,
    }: { textToCopy: string; buttonText: string; isClicked: boolean },
    ref: any
  ) => {
    return (
      <HStack width="100%" gap={4}>
        <Text
          background={colors.light_bg}
          width="100%"
          p={2}
          textAlign="center"
        >
          {textToCopy}
        </Text>

        <Button variant="primary" ref={ref} data-clipboard-text={textToCopy}>
          {isClicked ? `${buttonText} Copied!!` : `Copy ${buttonText}`}
        </Button>
      </HStack>
    );
  }
);
CopyWithTextButton.displayName = "CopyWithTextButton";
export default CopyWithTextButton;
