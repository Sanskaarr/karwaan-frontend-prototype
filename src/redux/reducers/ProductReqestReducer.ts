import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    getAllProduct: {
        loading: boolean,
        error: any,
        status: boolean,
    },
    getProduct: {
        loading: boolean,
        error: any,
        status: boolean,
    },

}


const initialState = {
    getAllProduct: {
        loading: false,
        error: null,
        status: false,
    },
    getProduct: {
        loading: false,
        error: null,
        status: false,
    },
 
} as InitialState

export const productRequests = createSlice({
  name: "PRODUCT REQUESTS",
  initialState,
  reducers: {
    // get All Product reducers 
    getAllProduct_request: (state) => {
        state.getAllProduct.loading = true;
        state.getAllProduct.error = null;
        state.getAllProduct.status = false;
    },
    getAllProduct_success: (state) => {
        state.getAllProduct.loading = false;
        state.getAllProduct.error = null;
        state.getAllProduct.status = true;
    },
    getAllProduct_failure: (state, action) => {
        state.getAllProduct.loading = false;
        state.getAllProduct.error = action?.payload?.error;
        state.getAllProduct.status = false;
    },
    // get Product reducers 
    getProduct_request: (state) => {
        state.getProduct.loading = true;
        state.getProduct.error = null;
        state.getProduct.status = false;
    },
    getProduct_success: (state) => {
        state.getProduct.loading = false;
        state.getProduct.error = null;
        state.getProduct.status = true;
    },
    getProduct_failure: (state, action) => {
        state.getProduct.loading = false;
        state.getProduct.error = "there is an error";
        state.getProduct.status = false;
    },

  },
});

export const {
    //  get all Product up reducers 
     getAllProduct_request,
     getAllProduct_success,
     getAllProduct_failure,
  
    //  get  Product up reducers 
     getProduct_request,
     getProduct_success,
     getProduct_failure,
  
} = productRequests.actions;

export default productRequests.reducer;
