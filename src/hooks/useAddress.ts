import { useAxios } from "./useAxios";
import axios from 'axios';
import { toast } from "react-toastify";
import { useAppDispatch } from "../redux/hooks";
import { addAddress_failure, addAddress_request, addAddress_success, changeAddress_failure, changeAddress_request, changeAddress_success, deleteAddress_failure, deleteAddress_request, deleteAddress_success, getAddress_failure, getAddress_request, getAddress_success } from "@/redux/reducers/AddressReqestReducer";
import { useRouter } from "next/navigation";
type formType = {
    houseNumber: string,
    buildingName: string,
    country: string,
    street: string,
    state: string,
    city: string,
    pin: string,
}
type Params = {
    token?: string | null;
    userId?: string | null;
    address?: formType,

}

export const useAddress = ({ token, userId, address }: Params) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const endpoint = `/api/v1/address/`;

    // handle Add Item To Cart
    const handleAddAddress = async (e: any) => {
        e.preventDefault();
        dispatch(addAddress_request());

        try {
            const { postCall } = useAxios(endpoint + userId, { ...address }, token);
            const result = await postCall();

            if (result.status === "success") {
                dispatch(addAddress_success(result.data));
                toast.success(result.message);
                router.push("/products/my-account");
            }
        } catch (error: any) {
            dispatch(addAddress_failure(error.message));

            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
                dispatch(addAddress_failure(error.response?.data.message));
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
    };

    // handle Get All Item
    const handleGetAddress = async () => {
        dispatch(getAddress_request());

        try {
            const { getCall } = useAxios(endpoint+userId, null, token);
            const res = await getCall();
            if (res?.status === "success") {
                dispatch(getAddress_success(res.data));
                return res.data;
            }
        } catch (error: any) {
            dispatch(getAddress_failure(error.message));
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
                dispatch(getAddress_failure(error.response?.data.message));
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

            toast.error(error.message);
        }
    };
    // // handle update Item
    const handleUpdateAddress = async (e: any, addressId: string) => {
        e.preventDefault();
        if (!addressId) return;
        dispatch(changeAddress_request());
        try {
            const { putCall } = useAxios(endpoint+addressId, {...address }, token);
            const result = await putCall();

            if (result.status === "success") {
                dispatch(changeAddress_success(false));
                toast.success(result.message);
                 router.push("/products/my-account");
            }
        } catch (error: any) {
            dispatch(changeAddress_failure(error.message));

            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
                dispatch(changeAddress_failure(error.response?.data.message));
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
    };
    // // handle remove all Item
    const handleDeleteAddress = async (e: any, addressId: string) => {
        e.preventDefault();
        dispatch(deleteAddress_request());
        try {
            const { deleteCall } = useAxios(endpoint+addressId, null, token);
            const result = await deleteCall();

            if (result.status === "success") {
                dispatch(deleteAddress_success());
                router.push("/products/my-account");
              toast.success(result.message);

            }
        } catch (error: any) {
            dispatch(deleteAddress_failure(error.message));

            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
                dispatch(deleteAddress_failure(error.response?.data.message));
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
    };

    return { handleAddAddress, handleGetAddress, handleUpdateAddress, handleDeleteAddress };
};
