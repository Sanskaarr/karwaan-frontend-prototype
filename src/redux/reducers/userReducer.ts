import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    _id: number | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    isEmailValid: boolean;
    password: string | null;
    phoneNumber: string | null;
    isPhoneNumberValid: boolean | null;
    image: string | null;
    role: 'user' | 'admin' | null;
    resetPasswordTokenExpire: number | null;
    resetPasswordToken: string | null;
    verifyEmailToken: string | null;
    verifyTokenEmailExpire: number | null;
    token: string | null;
    }

const initialState = {
    user: {
        _id: null,
        firstName: null,
        lastName: null,
        email: null,
        isEmailValid: false,
        password: null,
        phoneNumber: null,
        isPhoneNumberValid: false,
        image: null,
        role: null,
        resetPasswordToken: null,
        resetPasswordTokenExpire: null,
        verifyEmailToken: null,
        verifyTokenEmailExpire: null,
        token:null,
    } as InitialState
} ;

export const user = createSlice({
    name: "USER",
    initialState,
    reducers: {
        update_user_data: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        }
    }
});

export const {update_user_data} = user.actions;

export default user.reducer;
