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
      _disabled: {
        _hover: {
          background: `${colors.primary_dark}!important`,
        },
        svg: {
          path: {
            stroke: "black",
          },
        },
      },
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
