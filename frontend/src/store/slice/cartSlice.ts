import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type IinitialState = {
  cartOpen: boolean;
};
const initialState: IinitialState = {
  cartOpen: false,
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setOpen: (state) => {
      state.cartOpen = true;
    },
    setClose: (state) => {
      state.cartOpen = false;
    },
  },
});
export const { setClose, setOpen } = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
