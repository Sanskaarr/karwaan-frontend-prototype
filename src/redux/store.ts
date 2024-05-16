import { configureStore } from "@reduxjs/toolkit";
import userRequestReducer from "./reducers/userRequestReducer";
import userReducer from "./reducers/userReducer";
import ProductReducer from "./reducers/ProductReducer";
import ProductReqestReducer from "./reducers/ProductReqestReducer";
import AddressReducer from "./reducers/AddressReducer";
import AddressReqestReducer from "./reducers/AddressReqestReducer";
import CartReducer from "./reducers/CartReducer";
import CartRequestReducer from "./reducers/CartRequestReducer";
import OrderRequestReducer from "./reducers/OrderRequestReducer";

export const store = configureStore({
  reducer: {
    userRequest: userRequestReducer,
    user: userReducer,
    product: ProductReducer,
    productRequest: ProductReqestReducer,
    address: AddressReducer,
    addressRequest: AddressReqestReducer,
    cart:CartReducer,
    cartRequests:CartRequestReducer,
    orderRequests:OrderRequestReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
