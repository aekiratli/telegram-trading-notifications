import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import Protected from './ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SnackbarController from './components/notification/Snackbar';

// Create a new context object
export const AppContext = React.createContext();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);
  const [snackbar, setSnackbar] = React.useState({open:false,message:''});

  React.useEffect(() => {
    console.log(isAuthenticated)
  }, [isAuthenticated]);
  // Define a global state object
  const appState = {
    isAuthenticated,
    setIsAuthenticated,
    snackbar,
    setSnackbar,
  };

  return (
    // Provide the app state to all child components
    <AppContext.Provider value={appState}>
      <SnackbarController/>
      <BrowserRouter>
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
          <Route path="*" element={<div>404</div>}/>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
