const Button = {
  baseStyle: {
    fontWeight: "bold",
    borderRadius: 4,
  },
  variants: {
    primary: {
      bg: "#9d0000",
      color: "white",
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
