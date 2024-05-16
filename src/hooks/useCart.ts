import { useAxios } from "./useAxios";
import axios from 'axios';
import { toast } from "react-toastify";
import { useAppDispatch } from "../redux/hooks";
import {
    addItemToCart_request, addItemToCart_success, addItemToCart_failure,
    updateCartItemQuantity_request, updateCartItemQuantity_success, updateCartItemQuantity_failure,
    removeItemFromCart_request, removeItemFromCart_success, removeItemFromCart_failure,
    getAllCartItems_request, getAllCartItems_success, getAllCartItems_failure,
    emptyCart_request, emptyCart_success, emptyCart_failure,
} from "../redux/reducers/CartRequestReducer";
import { update_product_data } from "@/redux/reducers/CartReducer";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
type Params = {
    token?: string | null;
    productId?: string | null;
    userId?: string | null;
    cartItemId?: string | null;
    size?: '8"x12"' | '12"x18"' | '16"x24"' | '20"x30"' | '24"x36"';
    quantity?: number;
}

export const useCart = ({ token, userId }: Params) => {

    const dispatch = useAppDispatch();
    type resDataType = {
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

    type resCartDataType = {
        productDetails: {
            _id: string;
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
    const resCartItem=useSelector((state: RootState) => state.cart.products);

    // handle Add Item To Cart
    const handleAddItemToCart = async (e: any, productId: string | null, size: '8"x12"' | '12"x18"' | '16"x24"' | '20"x30"' | '24"x36"') => {
        dispatch(addItemToCart_request());

        try {
            let endpoint = '/api/v1/cart-item';
            let productDetails = {

                id: productId,
                size: size,
                quantity: 1,
            }
            const { postCall } = useAxios(endpoint, {
                productDetails,
                userId: userId
            }, token);
            const result = await postCall();

            if (result.status === "success") {
                dispatch(addItemToCart_success());
                let resCartObj: resDataType={productDetails: {
                    productId: productId as string,
                    description: result.data.productDetails.description,
                    name: result.data.productDetails.name,
                    price: result.data.productDetails.price,
                    tags: result.data.productDetails.tags,
                    url: result.data.productDetails.url,
                },
                quantity: 1,
                size: size,
                userId: result.data.userId,
                _id: result.data._id,
            }
            let updatedResCartItems: resDataType[];
            if(resCartItem.length===0){
                updatedResCartItems=[];
                updatedResCartItems.push(resCartObj as resDataType);
            }else{

                updatedResCartItems =[...resCartItem];
                updatedResCartItems.push(resCartObj as resDataType);
            }
            // }
              dispatch(update_product_data(updatedResCartItems))
                toast.success(result.message);

            }
        } catch (error: any) {
            dispatch(addItemToCart_failure(error.message));

            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
                dispatch(addItemToCart_failure(error.response?.data.message));
            }
        }
    };

    // handle update Cart Item Quantity
    const UpdateCartItemQuantity = async (e: any, _id: string, quantity: number, index: number) => {


        dispatch(updateCartItemQuantity_request());
        try {
            let endpoint = `/api/v1/cart-item/${_id}`;
            const { putCall } = useAxios(endpoint, {
                quantity: quantity,
            }, token);
            const result = await putCall();

            if (result.status === "success") {
                dispatch(updateCartItemQuantity_success());
                let updatedResCartItems: resDataType[]|[] = [...resCartItem as resDataType[]]; // Copy the current state value
              

                updatedResCartItems[index] = {...updatedResCartItems[index] ,quantity:quantity};
                if (quantity <= 0) {
                    updatedResCartItems = updatedResCartItems.filter(
                        (item) => item.quantity > 0
                    );
                }
                // Update the state with the new cart items
                dispatch(update_product_data(updatedResCartItems));
             
                // handleResCartItems(productId as cartItemType['productId'], size as cartItemType['size'], quantity as number, result.data)
                // handleCartItems(productId as cartItemType['productId'], size as cartItemType['size'], quantity as number)
                toast.success(result.message);

            }
        } catch (error: any) {
            dispatch(updateCartItemQuantity_failure(error.message));

            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
                dispatch(updateCartItemQuantity_failure(error.response?.data.message));
            }
        }
    };

    // handle Get All Item
    const handleGetAllItem = async () => {
        dispatch(getAllCartItems_request());

        try {
            let endpoint = `/api/v1/cart-item/${userId}`;
            const { getCall } = useAxios(endpoint, null, token);
            const res = await getCall();

            if (res?.status === "success") {
                dispatch(getAllCartItems_success());
                let updatedResCartItems: resDataType[]|[]= res.data?.map((item: resCartDataType) => ({
                    productDetails: {
                        productId: item.productDetails._id,
                        description: item.productDetails.description,
                        name: item.productDetails.name,
                        price: item.productDetails.price,
                        tags: item.productDetails.tags,
                        url: item.productDetails.url,
                    },
                    quantity: item.quantity,
                    size: item.size,
                    userId: item.userId,
                    _id: item._id,
                }));

                // Update the state with the new cart items
                dispatch(update_product_data(updatedResCartItems));
                // res.data.map((item: any) => {
                // handleResCartItems(item.productId as cartItemType['productId'], item.size as cartItemType['size'], undefined, res.data)
                //     // handleCartItems(item.productId as cartItemType['productId'], item.size as cartItemType['size'],item.quantity as number);
                // })
            }
        } catch (error: any) {
            dispatch(getAllCartItems_failure(error.message));

            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
                dispatch(getAllCartItems_failure(error.response?.data.message));
            }

            toast.error(error.message);
        }
    };

    // handle remove Item
    const HandleRemoveItemFromCart = async (e: any, cartItemId: string) => {
        e.preventDefault();
        if (!cartItemId) return;
        dispatch(removeItemFromCart_request());
        try {
            let endpoint = `/api/v1/cart-item/${cartItemId}`;
            const { deleteCall } = useAxios(endpoint, {
                userId: userId
            }, token);
            const result = await deleteCall();

            if (result.status === "success") {

                let updatedResCartItems: resDataType[]|[] = resCartItem?.filter((item: resDataType) => item._id!==result.data.removedItem._id) as resDataType[]|[] ;
                 // Update the state with the new cart items
                 dispatch(update_product_data(updatedResCartItems as resDataType[]|[]));
                dispatch(removeItemFromCart_success());
            
            }
        } catch (error: any) {
            dispatch(removeItemFromCart_failure(error.message));

            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
                dispatch(removeItemFromCart_failure(error.response?.data.message));
            }
        }
    };

    // handle remove all Item
    const HandleEmptyCart = async (e: any) => {
        e.preventDefault();
        dispatch(emptyCart_request());
        try {
            let endpoint = `/api/v1/cart-item/empty-cart/${userId}`;
            const { deleteCall } = useAxios(endpoint, null, token);
            const result = await deleteCall();

            if (result.status === "success") {
                dispatch(update_product_data([]));
                dispatch(emptyCart_success());

            }
        } catch (error: any) {
            dispatch(emptyCart_failure(error.message));

            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
                dispatch(emptyCart_failure(error.response?.data.message));
            }
        }
    };

    return { handleAddItemToCart, UpdateCartItemQuantity, resCartItem, handleGetAllItem, HandleRemoveItemFromCart, HandleEmptyCart };
};

