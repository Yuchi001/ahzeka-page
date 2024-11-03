import {createTheme} from "@mui/material";

export const theme = createTheme({
    cssVariables: { disableCssColorScheme: true },
    palette: {
        primary: {
            light: '#A13647',
            main: '#A13647',
            dark: '#A13647'
        },
        secondary: {
            light: '#BAAACE',
            main: '#795F9C',
            dark: '#4B2D73'
        },
        warning: {
            light: '#D46F6A',
            main: '#AA3F39',
            dark: '#801A15'
        },
        success: {
            light: '#52A55C',
            main: '#2C8437',
            dark: '#10631A'
        }
    },
});

export const theme_main = '#A13647'
export const theme_background = '#F7E4E7'
export const theme_paper = '#F9F5F6'