import { extendTheme } from '@chakra-ui/react';
import { theme as baseTheme } from '@saas-ui/react';


export const sciLiveTheme = extendTheme({
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    primary: {
     "50":  "#E7DABA",
     "100": "#A5BCD1", 
     "200": "#2B82C9", 
     "300": "#D89958", 
     "400": "#B7380C", 
     "500": "#6A6E72", 
     "600": "#565E64", 
     "700": "#30343A", 
     "800": "#262626",
     "900": "#000000",
    },
  },
});
