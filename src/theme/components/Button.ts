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
    outlined: {
      bg: colors.white,
      color: colors.primary,
      border: `1px solid ${colors.primary}`,
    },
    // outlinedNoBorder: {
    //   ...outlined,
    //   borderRadius: 0
    // },
    link: {
      color: colors.primary,
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
