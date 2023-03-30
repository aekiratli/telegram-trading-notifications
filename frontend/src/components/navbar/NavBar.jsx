import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useLocation } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useAppContext } from '../../AppContext';
import { SIDEBAR_ITEMS } from './config';
import { loadIcon } from '../icons';
import { Main, AppBar, drawerWidth, DrawerHeader, StyledLink } from './styles';
import TelegramIcon from '@mui/icons-material/Telegram';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Switch from '@mui/material/Switch';
import { LIGHT_THEME, DARK_THEME } from '../../themes';

export default function PersistentDrawerLeft() {
  const { setIsSidebarOpen, isSidebarOpen, userName, setSelectedTheme,setIsLightModeToggled, isLightModeToggled } = useAppContext();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const location = useLocation();
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setIsSidebarOpen(true);
  };

  const handleDrawerClose = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTheme = (e) => {
    setIsLightModeToggled(e.target.checked)
    console.log(e.target.checked)
    if (e.target.checked)
      setSelectedTheme(LIGHT_THEME)
    else
      setSelectedTheme(DARK_THEME)
  };


  if (location.pathname === '/login') {
    return <></>; // Render nothing if the path is '/login'
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="static" open={isSidebarOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(isSidebarOpen && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          {"Welcome " + userName + "!"}
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              style={{ marginTop: "30px" }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={isSidebarOpen}
      >
        <DrawerHeader>
          <TelegramIcon />
          Trading Notifications
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box height="100%" display="flex" flexDirection="column" justifyContent="space-between">
          <List>
            {
              SIDEBAR_ITEMS.map(item => {
                return (
                  <StyledLink key={item.display_name} to={item.navigate_to}>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          {loadIcon(item.icon)}
                        </ListItemIcon>
                        <ListItemText primary={item.display_name} />
                      </ListItemButton>
                    </ListItem>
                  </StyledLink>
                )
              })
            }
            <Divider style={{ position: "relative", bottom: "1px" }} />
          </List>
          <div>
            <Divider style={{ position: "relative", bottom: "2px" }}/>
            <Box height="48px" display="flex" flexDirection="row" justifyContent="center" alignItems="center">
              <DarkModeIcon />
              <Switch value={isLightModeToggled} onChange={handleTheme} size="small"/>
              <LightModeIcon />
            </Box>
          </div>
        </Box>
      </Drawer>

      <DrawerHeader />

    </Box >
  );
}