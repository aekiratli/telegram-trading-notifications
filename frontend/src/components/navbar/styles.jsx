import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export const drawerWidth = 240;

export const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isLoggedIn',
})(({ theme, open, isLoggedIn }) => ({
  flexGrow: 1,
  marginTop: '40px',
  padding: theme.spacing(0),
  paddingLeft: '40px',
  paddingRight: '40px',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `${drawerWidth}px`,
  }),
  ...(open &&
    !isLoggedIn && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      paddingLeft: 0,
      paddingRight: 0,
      marginTop: 0,
    }),
}));

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
