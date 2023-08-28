import { colors } from "../colors";

const Button = {
  baseStyle: {
    fontWeight: "bold",
    borderRadius: "8px",
  },
  variants: {
    primary: {
      bg: colors.primary,
      color: colors.white,
    },
  },
  sizes: {
    md: {
      fontSize: "md",
      px: 5,
      py: 3,
    },
  },
  defaultProps: {
    variant: "primary",
    size: "md",
  },
};

export default Button;
