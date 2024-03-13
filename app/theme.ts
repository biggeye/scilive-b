import { extendTheme } from '@chakra-ui/react';
import { theme as baseTheme } from '@saas-ui/react';
import '@fontsource-variable/exo-2';
import '@fontsource-variable/orbitron';
import '@fontsource/press-start-2p';

export const sciLiveTheme = extendTheme({
  fonts: {
    heading: `'Press Start 2P', sans-serif`,
    body: `'Exo 2 Variable', sans-serif`,
    div: `'Orbitron Variable'`,
    code: `'Press Start 2P'`,
    systemUi: `'Orbitron Variable'`,
  },
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    primary: {
      "50": "#f2f2f2", // Lightest gray
      "100": "#d9d9d9", // Lighter gray
      "200": "#bfbfbf", // Light gray
      "300": "#a6a6a6", // Gray
      "400": "#8c8c8c", // Medium gray
      "500": "#737373", // Default gray
      "600": "#595959", // Dark gray
      "700": "#404040", // Darker gray
      "800": "#262626", // Very dark gray
      "900": "#0d0d0d", // Darkest gray (almost black)
    },
    accent: {
      blue: "#245883", // Deep blue, could be used for highlights
      orange: "#d35400", // Deep orange, could be used for call-to-action or important elements
    },
  },
});
