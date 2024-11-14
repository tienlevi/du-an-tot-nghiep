import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './slice/cartSlice';
import authReducer from './slice/authSlice';
import filterSlice from '@/store/slice/filterSlice';

const rootReducer = combineReducers({
    cartReducer,
    auth: authReducer,
    filter: filterSlice.reducer,
});

export default rootReducer;
