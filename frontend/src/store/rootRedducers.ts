import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './slice/cartSlice';
import authReducer from './slice/authSlice';
import filterSlice from '@/store/slice/filterSlice';
<<<<<<< HEAD

=======
import orderReducer from './slice/orderSlice';
>>>>>>> FE/Shipping-test
const rootReducer = combineReducers({
    cartReducer,
    auth: authReducer,
    filter: filterSlice.reducer,
<<<<<<< HEAD
=======
    order: orderReducer,
>>>>>>> FE/Shipping-test
});

export default rootReducer;
