import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    addAddress: {
        loading: boolean,
        error: any,
        Address: any,
    
    },
    getAddress: {
        loading: boolean,
        error: any,
        Address: any,
       
    },
    changeAddress: {
        loading: boolean,
        success: boolean,
        error: any,
        confirm:boolean,
    },
    deleteAddress: {
        loading: boolean,
        success: boolean,
        error: any,
    }
}


const initialState = {
    addAddress: {
        loading: false,
        error: null,
        Address: null,

    },
    getAddress: {
        loading: false,
        error: null,
        Address: null,
       
    },
    changeAddress: {
        loading: false,
        success: false,
        error: null,
        confirm:false,
    },
    deleteAddress: {
        loading: false,
        success: false,
        error: null,
    }
} as InitialState

export const AddressRequests= createSlice({
  name: "ADDRESS REQUESTS",
  initialState,
  reducers: {
    //add Address reducers 
    addAddress_request: (state) => {
        state.addAddress.loading = true;
        state.addAddress.error = null;
        state.addAddress.Address = null;
    },
    addAddress_success: (state, action) => {
        state.addAddress.loading = false;
        state.addAddress.error = null;
        state.addAddress.Address = action.payload.Address;  
    },
    addAddress_failure: (state, action) => {
        state.addAddress.loading = false;
        state.addAddress.error = "there is an error";
        state.addAddress.Address = null;
    },
    
    // update Address reducers 
    getAddress_request: (state) => {
        state.getAddress.loading = true;
        state.getAddress.error = null;
        state.getAddress.Address = null;
       
    },
    getAddress_success: (state, action) => {
        state.getAddress.loading = false;
        state.getAddress.error = null;
        state.getAddress.Address = action.payload.Address;
       
    },
    getAddress_failure: (state, action) => {
        state.getAddress.loading = false;
        state.getAddress.error = "there is an error";
        state.getAddress.Address = null;
  
    },
       // change Address  reducers 
        changeAddress_request: (state) => {
        state.changeAddress.loading = true;
        state.changeAddress.error = null;
        state.changeAddress.success = false;
        state.changeAddress.confirm = false;

    },
        changeAddress_success: (state,action) => {
        state.changeAddress.loading = false;
        state.changeAddress.error = null;
        state.changeAddress.success = true;
        state.changeAddress.confirm = action.payload;

    },
        changeAddress_failure: (state) => {
        state.changeAddress.loading = false;
        state.changeAddress.error =  "there is an error";
        state.changeAddress.success = false;
        state.changeAddress.confirm = false;

    },
    
    // delete Address reducers
        deleteAddress_request: (state) => {
        state.deleteAddress.loading = true;
        state.deleteAddress.error = null;
        state.deleteAddress.success = false;
    },
        deleteAddress_success: (state) => {
        state.deleteAddress.loading = false;
        state.deleteAddress.error = null;
        state.deleteAddress.success = true;
    },
        deleteAddress_failure: (state, action) => {
        state.deleteAddress.loading = false;
        state.deleteAddress.error =  "there is an error";
        state.deleteAddress.success = false;
    },
},
});

export const {
    // add Address reducers 
    addAddress_request,
    addAddress_success,
    addAddress_failure,
    // update Address reducers
    getAddress_request,
    getAddress_success,
    getAddress_failure,
    //send verify Email reducers 
    changeAddress_request,
    changeAddress_success,
    changeAddress_failure,
 
    //forgot Password reducers
    deleteAddress_request,
    deleteAddress_success,
    deleteAddress_failure,
  
} = AddressRequests.actions;

export default AddressRequests.reducer;
