import {
  ChakraProvider,
  ColorModeProvider,
  extendTheme,
} from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

const theme = extendTheme({
  colors: {
    "box-shadow":
      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
  },
});

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          initialColorMode: "light",
          useSystemColorMode: false,
        }}
      >
        {children}
      </ColorModeProvider>
    </ChakraProvider>
  );
};
