import { extendTheme } from '@chakra-ui/react';
import { theme as baseTheme } from '@saas-ui/react';

export const sciLiveTheme = extendTheme({
    ...baseTheme,
    colors: {
        ...baseTheme.colors,
        brand: {
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
                ...baseTheme.components.Button.baseStyle,
                _hover: {
                    ...baseTheme.components.Button.baseStyle._hover,
                    borderColor: 'brand.500', // Use the brand color you defined for hover states
                },
            },
        }
    }
});
