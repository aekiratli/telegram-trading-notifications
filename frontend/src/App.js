import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import Protected from './ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SnackbarController from './components/notification/Snackbar';
import NavBar from './components/navbar/NavBar';
import { Main } from './components/navbar/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useAppContext } from './AppContext';


const App = () => {

  const {isSidebarOpen} = useAppContext()

  const THEME = createTheme({
    typography: {
     "fontFamily": `"Quicksand"`,
     "fontSize": 14,
     "fontWeightLight": 300,
     "fontWeightRegular": 400,
     "fontWeightMedium": 500
    }
 });

  return (

    <ThemeProvider theme={THEME}>
     <SnackbarController />
      <BrowserRouter>
        <NavBar />
        <Main open={isSidebarOpen}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <Protected>
                  <Dashboard />
                </Protected>
              }
            />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </Main>
      </BrowserRouter>
      </ThemeProvider>

  );
};

export default App;
