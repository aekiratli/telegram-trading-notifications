// Libs
import React, { createContext, useContext } from 'react';
import { DARK_THEME } from './themes';

export const AppContext = createContext();

export const AppProvider = ({ children, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({ open: false, message: '' });
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [selectedTheme, setSelectedTheme] = React.useState(DARK_THEME);
  const [isLightModeToggled, setIsLightModeToggled] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [userName, setUsername] = React.useState('');
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        snackbar,
        selectedTheme,
        setSelectedTheme,
        setIsLightModeToggled,
        isLightModeToggled,
        setSnackbar,
        setIsSidebarOpen,
        isSidebarOpen,
        setUsername,
        userName,
        setIsLoggedIn,
        isLoggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}
