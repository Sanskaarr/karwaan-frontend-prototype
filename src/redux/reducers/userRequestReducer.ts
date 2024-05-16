import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    signup: {
        loading: boolean,
        error: string | null,
        user: any,
        token: string | null
    },
    signin: {
        loading: boolean,
        error: string | null,
        user: any,
        token: string | null
    },
    sendVerifyEmail: {
        loading: boolean,
        isEmailSend: boolean,
        error: string | null,
    },
    verifyEmail: {
        loading: boolean,
        isEmailVerified: boolean,
        error: string | null,
    },
    forgotPassword: {
        loading: boolean,
        error: string | null,
        mailSent: boolean,
    },
    resetPassword: {
        loading: boolean,
        error: string | null,
        isPasswordReset:boolean,
    },
    otp: {
        loading: boolean,
        error: string | null,
        isOtpSend:boolean,
    },
    getUser: {
        loading: boolean,
        error: string | null,
        status:boolean,
    },
    updateUser: {
        loading: boolean,
        error: string | null,
        status:boolean,
    },
  
    updatePhoneNumber: {
        loading: boolean,
        error: string | null,
        status:boolean,
    },
    deleteUser: {
        loading: boolean,
        error: string | null,
        status:boolean,
    },
    signoutUser: {
        loading: boolean,
        error: string | null,
        status:boolean,
    }
}


const initialState = {
    signup: {
        loading: false,
        error: null,
        user: null,
        token: null
    },
    signin: {
        loading: false,
        error: null,
        user: null,
        token: null
    },
    sendVerifyEmail: {
        loading: false,
        isEmailSend: false,
        error: null,
    },
    verifyEmail: {
        loading: false,
        isEmailVerified: false,
        error: null,
    },
    forgotPassword: {
        loading: false,
        error: null,
        mailSent: false,
    },
    resetPassword: {
        loading: false,
        error: null,
        isPasswordReset:false,
    },
    otp: {
        loading: false,
        error: null,
        isOtpSend:false,
    },
    getUser: {
        loading: false,
        error: null,
        status:false,
    },
    updateUser: {
        loading: false,
        error: null,
        status:false,
    },
    updatePhoneNumber: {
        loading: false,
        error: null,
        status:false,
    },
    deleteUser: {
        loading: false,
        error: null,
        status:false,
    },
    signoutUser: {
        loading: false,
        error: null,
        status:false,
    }
} as InitialState

export const userRequests= createSlice({
  name: "USER REQUESTS",
  initialState,
  reducers: {
    // sign up reducers 
    signup_request: (state) => {
        state.signup.loading = true;
        state.signup.error = null;
        state.signup.user = null;
        state.signup.token = null;
    },
    signup_success: (state, action) => {
        state.signup.loading = false;
        state.signup.error = null;
        state.signup.user = action.payload.user;
        state.signup.token = action.payload.token;
    },
    signup_failure: (state, action) => {
        state.signup.loading = false;
        state.signup.error = "there is an error";
        state.signup.user = null;
        state.signup.token = null;
    },
    
    // sign in reducers 
    signin_request: (state) => {
        state.signin.loading = true;
        state.signin.error = null;
        state.signin.user = null;
        state.signin.token = null;
    },
    signin_success: (state, action) => {
        state.signin.loading = false;
        state.signin.error = null;
        state.signin.user = action.payload.user;
        state.signin.token = action.payload.token;
    },
    signin_failure: (state, action) => {
        state.signin.loading = false;
        state.signin.error = "there is an error";
        state.signin.user = null;
        state.signin.token = null;
    },
       // send verify Email reducers 
        sendVerifyEmail_request: (state) => {
        state.sendVerifyEmail.loading = true;
        state.sendVerifyEmail.error = null;
        state.sendVerifyEmail.isEmailSend = false;
    },
        sendVerifyEmail_success: (state) => {
        state.sendVerifyEmail.loading = false;
        state.sendVerifyEmail.error = null;
        state.sendVerifyEmail.isEmailSend = true;
    },
        sendVerifyEmail_failure: (state, action) => {
        state.sendVerifyEmail.loading = false;
        state.sendVerifyEmail.error =  "there is an error";
        state.sendVerifyEmail.isEmailSend = false;
    },
       // verify Email reducers 
        verifyEmail_request: (state) => {
        state.verifyEmail.loading = true;
        state.verifyEmail.error = null;
        state.verifyEmail.isEmailVerified = false;
    },
        verifyEmail_success: (state) => {
        state.verifyEmail.loading = false;
        state.verifyEmail.error = null;
        state.verifyEmail.isEmailVerified = true;
    },
        verifyEmail_failure: (state, action) => {
        state.verifyEmail.loading = false;
        state.verifyEmail.error =  "there is an error";
        state.verifyEmail.isEmailVerified = false;
    },
    // forgot Password reducers
        forgotPassword_request: (state) => {
        state.forgotPassword.loading = true;
        state.forgotPassword.error = null;
        state.forgotPassword.mailSent = false;
    },
        forgotPassword_success: (state) => {
        state.forgotPassword.loading = false;
        state.forgotPassword.error = null;
        state.forgotPassword.mailSent = true;
    },
        forgotPassword_failure: (state, action) => {
        state.forgotPassword.loading = false;
        state.forgotPassword.error =  "there is an error";
        state.forgotPassword.mailSent = false;
    },
    //    reset Password reducers
        resetPassword_request: (state) => {
            state.resetPassword.loading = true;
            state.resetPassword.error = null;
            state.resetPassword.isPasswordReset = false;
        },
        resetPassword_success: (state) => {
            state.resetPassword.loading = false;
            state.resetPassword.error = null;
            state.resetPassword.isPasswordReset = true;
        },
        resetPassword_failure: (state, action) => {
            state.resetPassword.loading = false;
            state.resetPassword.error =  "there is an error";
            state.resetPassword.isPasswordReset =  false;
        },
    //      otp reducers
    otp_request: (state) => {
            state.otp.loading = true;
            state.otp.error = null;
            state.otp.isOtpSend = false;
        },
        otp_success: (state) => {
            state.otp.loading = false;
            state.otp.error = null;
            state.otp.isOtpSend = true;
        },
        otp_failure: (state, action) => {
            state.otp.loading = false;
            state.otp.error =  "there is an error";
            state.otp.isOtpSend =  false;
        },
        // getUser
        getUser_request: (state) => {
            state.getUser.loading = true;
            state.getUser.error = null;
            state.getUser.status = false;
        },
        getUser_success: (state) => {
            state.getUser.loading = false;
            state.getUser.error = null;
            state.getUser.status = true;
        },
        getUser_failure: (state, action) => {
            state.getUser.loading = false;
            state.getUser.error =  "there is an error";
            state.getUser.status =  false;
        },
        // updateUser
        updateUser_request: (state) => {
            state.updateUser.loading = true;
            state.updateUser.error = null;
            state.updateUser.status = false;
        },
        updateUser_success: (state) => {
            state.updateUser.loading = false;
            state.updateUser.error = null;
            state.updateUser.status = true;
        },
        updateUser_failure: (state, action) => {
            state.updateUser.loading = false;
            state.updateUser.error =  "there is an error";
            state.updateUser.status =  false;
        },
        // updatePhoneNumber
        updatePhoneNumber_request: (state) => {
            state.updatePhoneNumber.loading = true;
            state.updatePhoneNumber.error = null;
            state.updatePhoneNumber.status = false;
        },
        updatePhoneNumber_success: (state) => {
            state.updatePhoneNumber.loading = false;
            state.updatePhoneNumber.error = null;
            state.updatePhoneNumber.status = true;
        },
        updatePhoneNumber_failure: (state, action) => {
            state.updatePhoneNumber.loading = false;
            state.updatePhoneNumber.error =  "there is an error";
            state.updatePhoneNumber.status =  false;
        },
        // signout
       signoutUser_request: (state) => {
            state.signoutUser.loading = true;
            state.signoutUser.error = null;
            state.signoutUser.status = false;
        },
        signoutUser_success: (state) => {
            state.signoutUser.loading = false;
            state.signoutUser.error = null;
            state.signoutUser.status = true;
        },
        signoutUser_failure: (state, action) => {
            state.signoutUser.loading = false;
            state.signoutUser.error =  "there is an error";
            state.signoutUser.status =  false;
        },
        // deleteUser
        deleteUser_request: (state) => {
            state.deleteUser.loading = true;
            state.deleteUser.error = null;
            state.deleteUser.status = false;
        },
        deleteUser_success: (state) => {
            state.deleteUser.loading = false;
            state.deleteUser.error = null;
            state.deleteUser.status = true;
        },
        deleteUser_failure: (state, action) => {
            state.deleteUser.loading = false;
            state.deleteUser.error =  "there is an error";
            state.deleteUser.status =  false;
        },
  },
});

export const {
    // sign up reducers 
    signup_request,
    signup_success,
    signup_failure,
    // sign in reducers
    signin_request,
    signin_success,
    signin_failure,
    //send verify Email reducers 
    sendVerifyEmail_request,
    sendVerifyEmail_success,
    sendVerifyEmail_failure,
    //verify Email reducers 
    verifyEmail_request,
    verifyEmail_success,
    verifyEmail_failure,
    //forgot Password reducers
    forgotPassword_request,
    forgotPassword_success,
    forgotPassword_failure,
    //reset Password reducers
    resetPassword_request,
    resetPassword_success,
    resetPassword_failure,
    //otp reducers
    otp_request,
    otp_success,
    otp_failure,
    // getUser
    getUser_request,
    getUser_success,
    getUser_failure,
    // updateUser
    updateUser_request,
    updateUser_success,
    updateUser_failure,
    // updatePhoneNumber
    updatePhoneNumber_request,
    updatePhoneNumber_success,
    updatePhoneNumber_failure,
    // signoutUser
    signoutUser_request,
    signoutUser_success,
    signoutUser_failure,
    // deleteUser
    deleteUser_request,
    deleteUser_success,
    deleteUser_failure
} = userRequests.actions;

export default userRequests.reducer;
