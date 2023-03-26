// Libs
import React, { createContext, useContext } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children, ...rest }) => {

    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [snackbar, setSnackbar] = React.useState({ open: false, message: '' });
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
    const [userName, setUsername] = React.useState('');
  return (
    <AppContext.Provider
      value={{
      isAuthenticated,
      setIsAuthenticated,
      snackbar,
      setSnackbar,
      setIsSidebarOpen,
      isSidebarOpen,
      setUsername,
      userName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}
