import { extendTheme, theme as ChakraTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    primaryPalette: {
      primary: "#27ae60",
      secondary: "eb5757",
    },
    grey: {
      600: "#333333",
      300: "#828282",
      100: "#E0E0E0",
      0: "#F5F5F5",
    },
    feedback: {
      negative: "#E60000",
      warning: "#FFCD07",
      success: "#168821",
      information: "#155bcb",
    },
    fonts: {
      heading: "Inter",
      body: "Inter",
    },
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.375rem",
      "2xl": "1.625rem",
    },
    styles: {
      global: {
        body: {
          bg: "white",
          color: "gray.900",
        },
      },
    },
  },
});
