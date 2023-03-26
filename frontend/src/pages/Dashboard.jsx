import React, { useContext } from 'react';
import { AppContext } from '../App';

const Dashboard = () => {
  const { isAuthenticated } = useContext(AppContext);

  return (
    <div>
      {isAuthenticated ? (
        <h1>Welcome to the Dashboard!</h1>
      ) : (
        <h1>You need to log in first!</h1>
      )}
    </div>
  );
};

export default Dashboard;
