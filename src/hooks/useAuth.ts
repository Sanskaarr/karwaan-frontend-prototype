import { useAxios } from "./useAxios"
import axios from 'axios'
import { toast } from "react-toastify";
import { useAppDispatch } from "../redux/hooks";
import {
    signup_failure, signup_request, signup_success,
    signin_success, signin_failure, signin_request,
    sendVerifyEmail_failure, sendVerifyEmail_success,
    sendVerifyEmail_request,
} from "../redux/reducers/userRequestReducer";
import { runValidations } from "../utils/runValidations";
import { update_user_data } from "../redux/reducers/userReducer";
import { useRouter } from "next/navigation";
export const useAuth = (email?: string, password?: string | null, firstName?: string | null, lastName?: string | null, token?: string, id?: string) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    // handle sign up
    const handleSignup = async (e: any) => {
        e.preventDefault();
        const { runSignupValidation } = runValidations(email, password!, firstName!, lastName!);
        if (runSignupValidation() === false) {
            return;
        }
        dispatch(signup_request());
        try {
            const { postCall } = useAxios('/api/v1/user/signup', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            });

            const response = await postCall();

            if (response.status === "success") {
                dispatch(signup_success({ user: response.data.user, token: response.data.token }));
                dispatch(update_user_data({ ...response.data.user, token: response.data.token }));

                localStorage.setItem('user', JSON.stringify({ ...response.data.user, token: response.data.token }));
                if (response.data.user.isEmailVerified === true) {
                    return (() => {
                        toast.success("Registration successfull");
                        router.push('/shop')
                    })();
                } else {
                    return function success() {
                        toast.success("Registration successfull");
                        router.push('/send-verify-email')
                    }();
                }
            }
        } catch (error: any) {
            // dispatch(signup_failure(error.message));
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
                // dispatch(signup_failure(error.response?.data.message));
            }
        }
    }
// handle sign in
    const handleSignin = async (e: any) => {
        e.preventDefault()
        const { runSigninValidation } = runValidations(email, password!);
        const isUserLogin = localStorage.getItem('user');
        if (runSigninValidation() === false && isUserLogin) {
            return;
        }
        dispatch(signin_request());
        try {
            const { postCall } = useAxios('/api/v1/user/signin', {
                email: email,
                password: password
            });
            const response = await postCall();
            if (response.status === "success") {
                dispatch(signin_success({ user: response.data.user, token: response.data.token }));
                dispatch(update_user_data({ ...response.data.user, token: response.data.token }));
                localStorage.setItem('user', JSON.stringify({ ...response.data.user, token: response.data.token }));
                if (response.data.user.isEmailValid === true) {
                    toast.success(response.message && response.message, {
                        toastId: 'success1',
                    });
                    router.push('/shop');
                } else {
                    toast.success(response.message && response.message, {
                        toastId: 'success2',
                    });
                    router.push('/send-verify-email');
                }
            }
        } catch (error: any) {
            dispatch(signin_failure(error.message));
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
                dispatch(signin_failure(error.response?.data.message));

            }

        }
    }
    // handle send verify email
    const handleSendVerifyEmail = async (e: any) => {
        e.preventDefault();
        dispatch(sendVerifyEmail_request());
        try {
            const { postCall } = useAxios('/api/v1/user/send-verification-email', { email: email }, token)
            const response = await postCall();
            if (response.status === "success") {
                dispatch(sendVerifyEmail_success());
                return toast.success("Mail has been send. token valid for 15 minitues");
            }
        } catch (error: any) {
            dispatch(sendVerifyEmail_failure(error.message));
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
                dispatch(sendVerifyEmail_failure(error.response?.data.message));

                if (error.response?.status === 403) {
                    if (localStorage.getItem("user")) {
                        localStorage.removeItem("user");
                    }
                    if (localStorage.getItem('cartItems')) {
                        localStorage.removeItem("cartItems");
                    }
                    router.push('/signup');
                }
            }
        }
    }

    return { handleSignup, handleSignin, handleSendVerifyEmail }
} 