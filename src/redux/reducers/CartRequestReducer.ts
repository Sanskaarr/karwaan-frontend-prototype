import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    addItemToCart: {
        loading: boolean,
        error: any,
        status: boolean,
    },
    updateCartItemQuantity:{
        loading: boolean,
        error: any,
        status: boolean,
    }
    removeItemFromCart: {
        loading: boolean,
        error: any,
        status: boolean,
    },
    getAllCartItems: {
        loading: boolean,
        error: any,
        status: boolean,
    },
    emptyCart: {
        loading: boolean,
        error: any,
        status: boolean,
    },

}


const initialState = {
    addItemToCart: {
        loading: false,
        error: null,
        status: false,
    },
    updateCartItemQuantity: {
        loading: false,
        error: null,
        status: false,
    },
    removeItemFromCart: {
        loading: false,
        error: null,
        status: false,
    },
    getAllCartItems: {
        loading: false,
        error: null,
        status: false,
    },
    emptyCart: {
        loading: false,
        error: null,
        status: false,
    },

} as InitialState

export const cartRequests = createSlice({
    name: "CART REQUESTS",
    initialState,
    reducers: {
        // add Item To Cart reducers 
        addItemToCart_request: (state) => {
            state.addItemToCart.loading = true;
            state.addItemToCart.error = null;
            state.addItemToCart.status = false;
        },
        addItemToCart_success: (state) => {
            state.addItemToCart.loading = false;
            state.addItemToCart.error = null;
            state.addItemToCart.status = true;
        },
        addItemToCart_failure: (state, action) => {
            state.addItemToCart.loading = false;
            state.addItemToCart.error = "there is an error";
            state.addItemToCart.status = false;
        },
            // update Cart Item Quantity reducers 
            updateCartItemQuantity_request: (state) => {
                state.addItemToCart.loading = true;
                state.addItemToCart.error = null;
                state.addItemToCart.status = false;
            },
            updateCartItemQuantity_success: (state) => {
                state.addItemToCart.loading = false;
                state.addItemToCart.error = null;
                state.addItemToCart.status = true;
            },
            updateCartItemQuantity_failure: (state, action) => {
                state.addItemToCart.loading = false;
                state.addItemToCart.error = "there is an error";
                state.addItemToCart.status = false;
            },
        // remove Item From Cart reducers 
        removeItemFromCart_request: (state) => {
            state.removeItemFromCart.loading = true;
            state.removeItemFromCart.error = null;
            state.removeItemFromCart.status = false;
        },
        removeItemFromCart_success: (state) => {
            state.removeItemFromCart.loading = false;
            state.removeItemFromCart.error = null;
            state.removeItemFromCart.status = true;
        },
        removeItemFromCart_failure: (state, action) => {
            state.removeItemFromCart.loading = false;
            state.removeItemFromCart.error = "there is an error";
            state.removeItemFromCart.status = false;
        },

        // getAllCartItems 
        getAllCartItems_request: (state) => {
            state.getAllCartItems.loading = true;
            state.getAllCartItems.error = null;
            state.getAllCartItems.status = false;
        },
        getAllCartItems_success: (state) => {
            state.getAllCartItems.loading = false;
            state.getAllCartItems.error = null;
            state.getAllCartItems.status = true;
        },
        getAllCartItems_failure: (state, action) => {
            state.getAllCartItems.loading = false;
            state.getAllCartItems.error = "there is an error";
            state.getAllCartItems.status = false;
        },
        // get Product reducers 
        emptyCart_request: (state) => {
            state.emptyCart.loading = true;
            state.emptyCart.error = null;
            state.emptyCart.status = false;
        },
        emptyCart_success: (state) => {
            state.emptyCart.loading = false;
            state.emptyCart.error = null;
            state.emptyCart.status = true;
        },
        emptyCart_failure: (state, action) => {
            state.emptyCart.loading = false;
            state.emptyCart.error = "there is an error";
            state.emptyCart.status = false;
        },

    },
});

export const {
    //  get all Product up reducers 
    addItemToCart_request,
    addItemToCart_success,
    addItemToCart_failure,

  //  get all Product up reducers 
  updateCartItemQuantity_request,
  updateCartItemQuantity_success,
  updateCartItemQuantity_failure,

    //  remove Item From Cart reducers 
    removeItemFromCart_request,
    removeItemFromCart_success,
    removeItemFromCart_failure,

    //  get All Cart Items reducers 
    getAllCartItems_request,
    getAllCartItems_success,
    getAllCartItems_failure,

    //  empty Cart reducers 
    emptyCart_request,
    emptyCart_success,
    emptyCart_failure,

} = cartRequests.actions;

export default cartRequests.reducer;
