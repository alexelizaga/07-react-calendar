import { combineReducers } from '@reduxjs/toolkit';

import { uiReducer } from './uiReducer';
import { authReducer } from './authReducer';
import { calendarReducer } from './calendarReducer';

export const reducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    calendar: calendarReducer,
});