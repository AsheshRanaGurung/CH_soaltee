import { Box, Button, Spinner } from "@chakra-ui/react";
import React, { FC } from "react";

interface IButton {
  title: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  type?: "submit" | "reset" | "button";
  isLoading?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  height?: string;
  large?: string;
  small?: string;
  margin?: string;
  padding?: string;
  isLink?: boolean;
  link?: string;
  disabled?: boolean;
}

const PrimaryButton: FC<IButton> = ({
  title,
  onClick,
  padding,
  type = "button",
  height = "auto",
  isLoading = false,
  secondary = false,
  tertiary = false,
  disabled,
}) => {
  return (
    <Button
      type={type}
      sx={{
        "&:hover": {
          bg: secondary ? "#ffffff" : tertiary ? "#ffffff" : "#A1233D",
          color: secondary ? "#000000" : tertiary ? "#A1233D" : "#ffffff",
        },
        "&:active": {
          bg: secondary ? "#ffffff" : tertiary ? "#ffffff" : "#A1233D",
          color: secondary ? "#000000" : tertiary ? "#A1233D" : "#ffffff",
        },
      }}
      onClick={onClick}
      height={height ? height : "auto"}
      border={secondary ? "1px solid #000000" : "1px solid #A1233D"}
      bg={secondary ? "#ffffff" : tertiary ? "#ffffff" : "#A1233D"}
      color={secondary ? "#000000" : tertiary ? "#A1233D" : "#ffffff"}
      padding={padding ? padding : "18px"}
      fontWeight={secondary ? "500" : "400"}
      fontSize={"15px"}
      isDisabled={disabled}
    >
      {title}

      {isLoading && (
        <Box justifyContent={"center"}>
          <Spinner size={"sm"} />
        </Box>
      )}
    </Button>
  );
};

export default PrimaryButton;
