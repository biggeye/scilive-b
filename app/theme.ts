import { extendTheme } from '@chakra-ui/react';
import { theme as baseTheme } from '@saas-ui/react';

export const sciLiveTheme = extendTheme({
    ...baseTheme,
    colors: {
        ...baseTheme.colors,
        primnary: {
            "50": "#f3f8fc",
            "100": "#d0e3f3",
            "200": "#a6cae8",
            "300": "#73abda",
            "400": "#569ad3",
            "500": "#3581c1",
            "600": "#2d6da3",
            "700": "#245883",
            "800": "#1f4a6f",
            "900": "#163650"
        },
    },
    components: {
        ...baseTheme.components,
        Button: {
          baseStyle: {
            _hover: {
              borderColor: 'primary.500', // Adjust to match the primary color in your theme
            },
          },
        },
        Box: {
          baseStyle: {
            _hover: {
              borderColor: 'primary.500', // Adjust to match the primary color in your theme
            },
          },
        },
      }
    })