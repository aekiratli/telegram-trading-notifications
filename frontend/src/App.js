import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Protected from './ProtectedRoute';
import Login from './pages/Login';
import Jobs from './pages/Jobs';
import Logs from './pages/Logs';
import TradesPage from './pages/Trades';
import NotFoundPage from './pages/NotFound';
import Settings from './pages/Settings';
import SnackbarController from './components/notification/Snackbar';
import NavBar from './components/navbar/NavBar';
import { Main } from './components/navbar/styles';
import { ThemeProvider } from '@mui/material/styles';
import { useAppContext } from './AppContext';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()

const App = () => {

  const { isSidebarOpen, selectedTheme, isLoggedIn } = useAppContext()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={selectedTheme}>
        <SnackbarController />
        <BrowserRouter>
          <NavBar />
          <Main open={isSidebarOpen} isLoggedIn={isLoggedIn}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/jobs"
                element={
                  <Protected>
                    <Jobs />
                  </Protected>
                }
              />
              <Route
                path="/logs"
                element={
                  <Protected >
                    <Logs />
                  </Protected>
                }
              />
              <Route
                path="/trades"
                element={
                  <Protected >
                    <TradesPage />
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
              <Route
                path="/"
                element={<Navigate to="/jobs" />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Main>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
