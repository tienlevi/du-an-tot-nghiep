import { ICartItemsResponse } from '@/types/Cart/CartResponse';
import { MyVoucher } from '@/types/MyVoucher';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type IinitialState = {
    cartOpen: boolean;
    items: ICartItemsResponse[];
    voucher?: MyVoucher;
    totalAfterDiscount: number;
    priceDiscount: number;
};
const initialState: IinitialState = {
    cartOpen: false,
    items: [],
    voucher: undefined,
    totalAfterDiscount: 0,
    priceDiscount: 0,
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
        setItemsCart: (state, payload: PayloadAction<ICartItemsResponse[]>) => {
            state.items = payload.payload;
        },
        removeItems: (state, payload: PayloadAction<string>) => {
            const filteredItems = state.items.filter(
                (item) => item._id !== payload.payload,
            );
            state.items = filteredItems;
        },
        updateItemsCart: (
            state,
            payload: PayloadAction<ICartItemsResponse>,
        ) => {
            const findIndex = state.items.findIndex(
                (item) => item._id === payload.payload._id,
            );
            state.items[findIndex] = payload.payload;
        },
        addItems: (state, payload: PayloadAction<ICartItemsResponse>) => {
            state.items.push(payload.payload);
        },
        removeAll: (state) => {
            state.items = [];
        },
        calculateOrderHasVoucher: (
            state,
            payload: PayloadAction<{ voucher: MyVoucher; totalAmount: number }>,
        ) => {
            const totalAmount = payload.payload.totalAmount as any;
            const voucher = payload.payload.voucher;

            state.voucher = voucher;
            if (!voucher) {
                state.totalAfterDiscount = totalAmount;
            } else {
                const { discountType, discountValue } = voucher.voucherId;

                let discountedAmount = totalAmount;

                if (discountType === 'fixed') {
                    discountedAmount = totalAmount - discountValue;
                    state.priceDiscount = discountValue;
                } else {
                    discountedAmount =
                        totalAmount - totalAmount * (discountValue / 100);
                    state.priceDiscount = totalAmount * (discountValue / 100);
                }

                // Ensure discounted amount is not negative
                discountedAmount = Math.max(discountedAmount, 0);
                state.totalAfterDiscount = discountedAmount;
            }
        },
    },
});
export const {
    setClose,
    setOpen,
    setItemsCart,
    removeItems,
    addItems,
    removeAll,
    updateItemsCart,
    calculateOrderHasVoucher,
} = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
