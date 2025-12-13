import { JSX, useContext } from 'react';
import {  useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import {  RootState } from '../app/store';
import { AuthContext } from '../contexts/auth';
import * as REQUEST_REQUIREMENTS from '../app/api/requestRequirements';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const loading = useSelector((state: RootState) => state.session.loading);
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const { loggedIn, currentUser, authChecked } = authContext as { 
                                                                  loggedIn: boolean; 
                                                                  currentUser: any;
                                                                  authChecked: boolean;
                                                                };

  if (!authChecked || loading) {
    return <h2>Loading...</h2>;
  }

  if (!loggedIn) {

    const fromLocation = (location.state as any)?.from || { pathname: REQUEST_REQUIREMENTS.SIGNIN_ENDPOINT };
    return <Navigate to={fromLocation} state={{ from: location }} replace />;
  }

  if (!currentUser && !loggedIn) {
    return <h2>Loading user data...</h2>;
  }

  return children;
}

export default PrivateRoute;