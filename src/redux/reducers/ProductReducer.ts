import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    userId: string;
    name: string;
    tags: string[];
    description: string;
    price: number;
    url: string;
    createdAt: string;
    updatedAt: string;
    }

const initialState = {
    products:[] as InitialState[]
} ;

export const product = createSlice({
    name: "PRODUCT",
    initialState,
    reducers: {
        update_product_data: (state, action) => {
            // state.products = { ...state.products, ...action.payload };
            state.products = [...action.payload];
        }
    }
});

export const {update_product_data} = product.actions;

export default product.reducer;
