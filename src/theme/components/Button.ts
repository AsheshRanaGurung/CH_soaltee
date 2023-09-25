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
      _hover: {
        opacity: "0.8",
      },
      _disabled: {
        _hover: {
          background: `${colors.light_red}!important`,
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
    ghost: {
      bg: "transparent",
      color: colors.white,
      border: `1px solid ${colors.white}`,
      _hover: {
        color: colors.primary,
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
