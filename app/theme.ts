import { extendTheme } from '@chakra-ui/react';
import { theme as baseTheme } from '@saas-ui/react';


export const sciLiveTheme = extendTheme({
  ...baseTheme,
  colors: {
    primary: {
     "50":  "#A5BCD1",
     "100": "#689ECA", 
     "200": "#2B82C9",
     "300": "#E7DABA",
     "400": "#D89958", 
     "500": "#B7380C", 
     "600": "#6A6E72", 
     "700": "#30343A", 
     "800": "#262626",
     "900": "#131313",
    },
  },
});