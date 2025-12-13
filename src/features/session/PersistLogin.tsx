import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUserFromStorage } from './sessionSlice';
import { RootState, AppDispatch } from '../../app/store';
import { Outlet } from 'react-router-dom';

export default function PersistLogin() {
  const userValidated = useSelector((state: RootState) => state.session.loggedIn);
  const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   if (!userValidated) {
  //     dispatch(authenticateUserFromStorage());
  //   }
  // }, []);

  return (
    <>
      <Outlet />
    </>
  );
}