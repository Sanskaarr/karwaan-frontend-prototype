import { useAxios } from "./useAxios";
import axios from 'axios';
import { toast } from "react-toastify";
import { useAppDispatch } from "../redux/hooks";
import {
    createOrder_request, createOrder_success, createOrder_failure,
    updateOrderPaymentStatus_request, updateOrderPaymentStatus_success, updateOrderPaymentStatus_failure,
} from "../redux/reducers/OrderRequestReducer";
import { usePathname, useRouter } from "next/navigation";
import { update_product_data } from "@/redux/reducers/CartReducer";

type Products= {
        productId: string;
        quantity: number;
        size: '8"x12"' | '12"x18"' | '16"x24"' | '20"x30"' | '24"x36"'
    }[];

type InitialState = {
    productDetails: {
        productId: string;
        description: string;
        name: string;
        price: number;
        tags: string[];
        url: string;
    }
    quantity: number;
    size: '8"x12"' | '12"x18"' | '16"x24"' | '20"x30"' | '24"x36"';
    userId: string;
    _id: string;
}
type UseOrder={
    token: string | null,
     userId?: string , 
     resCartItem?:InitialState[],
      orderId?: string | null
}
export const useOrder = ({ token, userId, resCartItem, orderId }: UseOrder) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const pathName=usePathname();
    // create Order
    const handleCreateOrder = async (e: any,CartItem?:InitialState[]) => {
        e.preventDefault();
        dispatch(createOrder_request());
        try {
            let endpoint = '/api/v1/order';

            const products : any = (CartItem??resCartItem)?.map((item:InitialState)=> ({
                productId: item.productDetails.productId,
                quantity: item.quantity,
                size: item.size
            }));

            const { postCall } = useAxios(endpoint, {
                userId: userId,
                products:products,
            }, token);
            const result = await postCall();

            if (result.status === "success") {
                dispatch(createOrder_success({linkToPaymentGateway:result.data.payment_details.short_url,reDirectTo:pathName}));
                router.push('/confirmaddress');
            }
        } catch (error: any) {
            dispatch(createOrder_failure(error.message));

            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
                dispatch(createOrder_failure(error.response?.data.message));
                if(error.response?.status===400){
                    router.push('/products/my-account')
                }
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

    // update Order Payment Status 
    const updateOrderPaymentStatus = async () => {
        dispatch(updateOrderPaymentStatus_request());

        try {
            let endpoint = `/api/v1/order/${orderId}`;
            const { putCall } = useAxios(endpoint, null, token);
            const result = await putCall();
            if (result.status === "success") {
                if(result?.data.order_details?.products.length!==1){
                 dispatch(update_product_data([]));
                }
                dispatch(updateOrderPaymentStatus_success());
                return result;
            }
           
        } catch (error: any) {
            dispatch(updateOrderPaymentStatus_failure(error.message));

            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
                dispatch(updateOrderPaymentStatus_failure(error.response?.data.message));
             
                if (error.response?.status === 403) {
                    if (localStorage.getItem("user")) {
                        localStorage.removeItem("user");
                    }
                   
                    router.push("/signup");
                }
            }

        }
    };
   
    // handle Get My Orders Payment Status 
    const handleGetMyOrders = async () => {
        dispatch(updateOrderPaymentStatus_request());

        try {
            let endpoint = `/api/v1/order/all-orders/${userId}`;
            const { getCall } = useAxios(endpoint, null, token);
            const result = await getCall();
            if (result.status === "success") {
                dispatch(updateOrderPaymentStatus_success());

                return result;
            }
           
        } catch (error: any) {
            dispatch(updateOrderPaymentStatus_failure(error.message));

            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
                dispatch(updateOrderPaymentStatus_failure(error.response?.data.message));
             
                if (error.response?.status === 403) {
                    if (localStorage.getItem("user")) {
                        localStorage.removeItem("user");
                    }
                    if (localStorage.getItem('cartItems')) {
                        localStorage.removeItem("cartItems");
                    }
                    router.push("/signup");
                }
            }

        }
    };
   

    return { handleCreateOrder, updateOrderPaymentStatus, handleGetMyOrders };
};

