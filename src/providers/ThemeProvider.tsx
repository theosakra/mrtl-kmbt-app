import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <ChakraProvider>
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
