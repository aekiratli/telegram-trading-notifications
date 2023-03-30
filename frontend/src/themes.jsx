import { createTheme } from '@mui/material/styles';


export const DARK_THEME = createTheme({
    typography: {
        "fontFamily": `"Quicksand"`,
        "fontSize": 14,
        "fontWeight": "bold",
    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#607d8b', // blue gray
        },
        secondary: {
            main: '#8bc34a', // light green
        },
        background: {
            default: '#263238', // dark blue gray
            paper: '#37474f', // blue gray
        },
        text: {
            primary: '#ffffff', // white
            secondary: '#cfd8dc', // light blue gray
        },
    },
});

export const LIGHT_THEME = createTheme({
    palette: {
      primary: {
        main: "#52796f", // a muted shade of green
      },
      secondary: {
        main: "#b36844", // a muted shade of orange
      },
      background: {
        default: "#f0f0f0", // a slightly darker shade of gray
      },
    },
    typography: {
      fontFamily: "Quicksand",
      fontSize: 14,
      fontWeight: "bold",
    },
  });