import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    createOrder: {
        loading: boolean,
        error: any,
        status: boolean,
    },
    updateOrderPaymentStatus: {
        loading: boolean,
        error: any,
        status: boolean,
    },
    order:{
        linkToPaymentGateway:string;
        reDirectTo:string;
    },

}


const initialState = {
    createOrder: {
        loading: false,
        error: null,
        status: false,
    },
    updateOrderPaymentStatus: {
        loading: false,
        error: null,
        status: false,
    },
    order:{
        linkToPaymentGateway:"",
        reDirectTo:"",
    },

} as InitialState

export const orderRequests = createSlice({
    name: "ORDER REQUESTS",
    initialState,
    reducers: {
        // create Order reducers 
        createOrder_request: (state) => {
            state.createOrder.loading = true;
            state.createOrder.error = null;
            state.createOrder.status = false;
            state.order.linkToPaymentGateway="";
            state.order.reDirectTo="";

        },
        createOrder_success: (state,action) => {
            state.createOrder.loading = false;
            state.createOrder.error = null;
            state.createOrder.status = true;
            state.order.linkToPaymentGateway=action.payload.linkToPaymentGateway;
            state.order.reDirectTo=action.payload.reDirectTo;
        },
        createOrder_failure: (state) => {
            state.createOrder.loading = false;
            state.createOrder.error = "there is an error";
            state.createOrder.status = false;
              state.order.linkToPaymentGateway="";
            state.order.reDirectTo="";
        },
        // remove Item From Cart reducers 
        updateOrderPaymentStatus_request: (state) => {
            state.updateOrderPaymentStatus.loading = true;
            state.updateOrderPaymentStatus.error = null;
            state.updateOrderPaymentStatus.status = false;
              state.order.linkToPaymentGateway="";
            state.order.reDirectTo="";

        },
        updateOrderPaymentStatus_success: (state) => {
            state.updateOrderPaymentStatus.loading = false;
            state.updateOrderPaymentStatus.error = null;
            state.updateOrderPaymentStatus.status = true;
              state.order.linkToPaymentGateway="";
            state.order.reDirectTo="";

        },
        updateOrderPaymentStatus_failure: (state, action) => {
            state.updateOrderPaymentStatus.loading = false;
            state.updateOrderPaymentStatus.error = "there is an error";
            state.updateOrderPaymentStatus.status = false;
              state.order.linkToPaymentGateway="";
            state.order.reDirectTo="";

        },

    
    },
});

export const {
    //  create Order reducers 
    createOrder_request,
    createOrder_success,
    createOrder_failure,

    //  remove Item From Cart reducers 
    updateOrderPaymentStatus_request,
    updateOrderPaymentStatus_success,
    updateOrderPaymentStatus_failure,

   

}= orderRequests.actions;

export default orderRequests.reducer;
