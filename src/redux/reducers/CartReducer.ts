import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    productDetails: {
        productId: string;
        description: string;
        name: string;
        price: number;
        tags: string[];
        url: string;
    }
    quantity: number;
    size: '8"x12"' | '12"x18"' | '16"x24"' | '20"x30"' | '24"x36"';
    userId: string;
    _id: string;
}
const initialState = {
    products:[] as InitialState[]|[]
} ;

export const cart = createSlice({
    name: "CART",
    initialState,
    reducers: {
        update_product_data: (state, action) => {
            // state.products = { ...state.products, ...action.payload };
            state.products = [...action.payload];
        }
    }
});

export const {update_product_data} = cart.actions;

export default cart.reducer;
