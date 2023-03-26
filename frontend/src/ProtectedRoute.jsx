import React, {useContext} from 'react'
import { Navigate } from 'react-router-dom'
import { AppContext } from './App'

function Protected({ children }) {
    const {isAuthenticated} = useContext(AppContext)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return children
}
export default Protected