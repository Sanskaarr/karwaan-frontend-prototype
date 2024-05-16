import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
        userId: string,
        houseNumber: string,
        buildingName: string,
        street: string,
        city: string,
        state: string,
        country: string,
        pin: string,
        createdAt: string,
        updatedAt: string,
    }

const initialState = {
    address:{
        userId: "",
        houseNumber: "",
        buildingName: "",
        street: "",
        city: "",
        state:"",
        country: "",
        pin: "",
        createdAt: "",
        updatedAt: "",
    } as InitialState
} ;

export const address = createSlice({
    name: "ADDRESS",
    initialState,
    reducers: {
        update_address_data: (state, action) => {
            state.address = { ...state.address, ...action.payload };
        }
    }
});

export const {update_address_data} = address.actions;

export default address.reducer;