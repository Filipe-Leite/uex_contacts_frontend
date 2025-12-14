import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import * as ROUTES from '../app/api/requestRequirements';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../app/store';

function PublicOnlyRoute({ children }: { children: ReactNode }) {
  const currentUser = useSelector((state: RootState) => state.session.currentUser);
  const location = useLocation();
  const loading = useSelector((state: RootState) => state.session.loading);

  if (loading) {
    return <h2>Loading</h2>;
  }

  if (!currentUser) {
    return <>{children}</>;
  }

  const redirectTo = ROUTES.HOME;
  return <Navigate to={redirectTo} state={{ from: location }} replace />;
}

export default PublicOnlyRoute;