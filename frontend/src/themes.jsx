import { createTheme } from '@mui/material/styles';

export const DARK_THEME = createTheme({
  typography: {
    fontFamily: `"Quicksand"`,
    fontSize: 14,
    fontWeight: 'bold',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#607d8b',
    },
    secondary: {
      main: '#8bc34a',
    },
    background: {
      default: '#263238',
      paper: '#37474f',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cfd8dc',
    },
    select: {
      background: '#37474f',
      color: '#ffffff',
      focusedBackground: '#8bc34a',
      focusedColor: '#ffffff',
    },
  },
});

export const LIGHT_THEME = createTheme({
  palette: {
    primary: {
      main: '#52796f',
    },
    secondary: {
      main: '#b36844',
    },
    background: {
      default: '#f0f0f0',
    },
    select: {
      background: '#f0f0f0',
      color: '#000000',
      focusedBackground: '#b36844',
      focusedColor: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Quicksand',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
