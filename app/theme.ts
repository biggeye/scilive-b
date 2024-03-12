import { extendTheme } from '@chakra-ui/react';
import { theme as baseTheme } from '@saas-ui/react';
import '@fontsource-variable/exo-2';
import '@fontsource-variable/orbitron';
import '@fontsource/press-start-2p';

export const sciLiveTheme = extendTheme({
  fonts: {
    heading: `'Press Start 2P', sans-serif`,
    body: `'Exo 2 Variable', sans-serif`,
    code: 'Press Start 2P',
    systemUi: 'Orbitron Variable',
  },
  ...baseTheme,
    colors: {
        ...baseTheme.colors,
        primary: {
            "50": "#f3f8fc",
            "100": "#d0e3f3",
            "200": "#a6cae8",
            "300": "#73abda",
            "400": "#569ad3",
            "500": "#3581c1",
            "600": "#2d6da3",
            "700": "#245883",
            "800": "#1f4a6f",
            "900": "#163650",
        },
    },

  components: {
    ...baseTheme.components,
    Button: {
      baseStyle: ({
        _focus: {
          boxShadow: `0 0 0 3px black`
        },
        _hover: {
          borderColor: 'gray.800', // Adjust to match the primary color in your theme
        },
      })
    },
    Box: {
      baseStyle: {
        _hover: {
          borderColor: 'gray.800', // Adjust to match the primary color in your theme
        },
      },
    },
  }
})