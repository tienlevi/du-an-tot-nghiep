import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './slice/cartSlice';
import authReducer from './slice/authSlice';

const rootReducer = combineReducers({
    cartReducer,
    auth: authReducer
});

export default rootReducer;
