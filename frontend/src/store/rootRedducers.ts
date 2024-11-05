import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './slice/cartSlice';

const rootReducer = combineReducers({
    cartReducer,
});

export default rootReducer;
