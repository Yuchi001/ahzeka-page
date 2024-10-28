import {createTheme} from "@mui/material";

const theme = createTheme({
    cssVariables: { disableCssColorScheme: true },
    palette: {
        primary: {
            light: '#4C688B',
            main: '#2B4970',
            dark: '#143054'
        },
        secondary: {
            light: '#D4AC6A',
            main: '#AA7F39',
            dark: '#805715'
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

export default theme;