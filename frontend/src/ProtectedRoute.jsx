import React from 'react'
import { Navigate } from 'react-router-dom'
import { isExpired, decodeToken } from "react-jwt";
import { useAppContext } from './AppContext';

function Protected({ children }) {

  const { setSnackbar, setUsername, isLoggedIn, setIsLoggedIn } = useAppContext()
  const storedToken = localStorage.getItem("token")
  const decodedToken = decodeToken(storedToken);
  const isTokenExpired = isExpired(storedToken);
  let isAuthenticated = false;
  if (decodedToken) {
    if (!("sub" in decodedToken && "exp" in decodedToken && !isTokenExpired)) {
      <Navigate to="/login" replace />
      setSnackbar({ open: true, message: "Login Expired", type: 'error' })
    }
    else {
      if (!isLoggedIn)
        setIsLoggedIn(true)
      setUsername(decodedToken.sub)
      isAuthenticated = true
    }
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return children
}
export default Protected