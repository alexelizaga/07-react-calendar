import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { authStartCheking } from '../actions/auth';

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector( state => state.auth);

  useEffect(() => {
    dispatch( authStartCheking() )
  }, [dispatch])

  if ( checking ) {
    return (<h5>Wait...</h5>);
  }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={
            <PublicRoute isAuthenticated={ !!uid } element={LoginScreen} />
          }
        />
        <Route path='/*' element={
            <PrivateRoute isAuthenticated={ !!uid } element={CalendarScreen}/>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
