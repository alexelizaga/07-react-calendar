import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { authStartCheking } from '../actions/auth';

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch( authStartCheking() )
  }, [dispatch])
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/*' element={<CalendarScreen />} />
      </Routes>
    </BrowserRouter>
  )
}
