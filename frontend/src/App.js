import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import Protected from './ProtectedRoute';
import Login from './pages/Login';
import Jobs from './pages/Jobs';
import Settings from './pages/Settings';
import SnackbarController from './components/notification/Snackbar';
import NavBar from './components/navbar/NavBar';
import { Main } from './components/navbar/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useAppContext } from './AppContext';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
const queryClient = new QueryClient()

const App = () => {

  const { isSidebarOpen } = useAppContext()

  const THEME = createTheme({
    // typography: {
    //   "fontFamily": `"Quicksand"`,
    //   "fontSize": 14,
    //   "fontWeight": "bold",

    // }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={THEME}>
        <SnackbarController />
        <BrowserRouter>
          <NavBar />
          <Main open={isSidebarOpen}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/jobs"
                element={
                  <Protected somevar={"Hello!"}>
                    <Jobs />
                  </Protected>
                }
              />
              <Route
                path="/settings"
                element={
                  <Protected>
                    <Settings />
                  </Protected>
                }
              />
              <Route path="*" element={<div>404</div>} />
            </Routes>
          </Main>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
