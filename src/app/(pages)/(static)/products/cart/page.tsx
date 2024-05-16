// pages/index.tsx
"use client";
import React, { useEffect } from "react";
import styles from "./style.module.css";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useOrder } from "@/hooks/UseOrder";
import { ClipLoader } from "react-spinners";
import withAuth from "@/component/RoutesProtect/withAuth";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { changeAddress_success } from "@/redux/reducers/AddressReqestReducer";
import { createOrder_success } from "@/redux/reducers/OrderRequestReducer";

const Cart: React.FC = () => {
  const router = useRouter();
  type InitialState = {
    productDetails: {
      productId: string;
      description: string;
      name: string;
      price: number;
      tags: string[];
      url: string;
    };
    quantity: number;
    size: '8"x12"' | '12"x18"' | '16"x24"' | '20"x30"' | '24"x36"';
    userId: string;
    _id: string;
  };
  const dispatch = useDispatch();
  const resCartItem = useSelector((state: RootState) => state.cart.products);
  const order = useSelector(
    (state: RootState) => state.orderRequests.order
  );
  const isAddressConfirm = useSelector(
    (state: RootState) => state.addressRequest.changeAddress.confirm
  );

  if (typeof window !== "undefined") {
    var token = JSON.parse(localStorage.getItem("user") as string)?.token;
    var _id = JSON.parse(localStorage.getItem("user") as string)?._id;

    //    if some one click on buy now and his/her address is confirm;
    if (isAddressConfirm && order.linkToPaymentGateway) {
      let link=order.linkToPaymentGateway;
      dispatch(changeAddress_success(false));
      dispatch(createOrder_success({linkToPaymentGateway:"",reDirectTo:""}));
      window.open(link);
    }
    // token, productId, userId, size, quantity
    var {
      handleGetAllItem,
      HandleEmptyCart,
      HandleRemoveItemFromCart,
      UpdateCartItemQuantity,
    } = useCart({ userId: _id, token: token });
  }
  if (resCartItem?.length) {
    var { handleCreateOrder } = useOrder({token:token,userId:_id,resCartItem:resCartItem});
  }
  useEffect(() => {
    handleGetAllItem();
  }, [token, _id]);
  // price according to size
  type validSize = '8"x12"' | '12"x18"' | '16"x24"' | '20"x30"' | '24"x36"';
  const priceCalculator = (price: number, selectedSize: validSize): number => {
    const pricePerSquareInch = price / 96;

    const prices = {
      '8"x12"': pricePerSquareInch * 8 * 12,
      '12"x18"': pricePerSquareInch * 12 * 18,
      '16"x24"': pricePerSquareInch * 16 * 24,
      '20"x30"': pricePerSquareInch * 20 * 30,
      '24"x36"': pricePerSquareInch * 24 * 36,
    };
    return Math.floor(prices[selectedSize]);
  };
  // Function to calculate total price for all items in resCartItem
  const calculateTotalPrice = (items: InitialState[]): number => {
    let totalPrice = 0;

    items.forEach((item) => {
      const itemPrice = priceCalculator(item.productDetails.price, item.size);
      totalPrice += itemPrice * item.quantity;
    });

    return totalPrice;
  };
  return (
    <div className={styles.cart}>
      <h1 className={styles.shoppingCart}>Shopping Cart</h1>
      {resCartItem ? (
        resCartItem.length ? (
          <div className={styles.cartContanier}>
            {/* products */}
            <div className={styles.products}>
              <h2 className={styles.heading}>Products</h2>

              {resCartItem &&
                resCartItem.map((data: any, index: number) => {
                  // console.log(data)
                  return (
                    <div className={styles.ProductsContainer} key={index}>
                      <img
                        className={styles.ProductsContainerLeft}
                        src={data?.productDetails?.url}
                        alt="not found"
                      />
                      <div className={styles.ProductsContainerRight}>
                        <div className={styles.cartItemInfo}>
                          <p
                            style={{
                              color: "black",
                              fontWeight: "bold",
                              marginRight: "4px",
                            }}
                          >
                            Name :
                          </p>
                          {data?.productDetails.name}
                        </div>
                        <div className={styles.cartItemInfo}>
                          <p
                            style={{
                              color: "black",
                              fontWeight: "bold",
                              marginRight: "4px",
                            }}
                          >
                            Tags :
                          </p>
                          {(data?.productDetails?.tags?.join(", "))??"uncategorized"}
                        </div>
                        <div className={styles.cartItemInfo}>
                          <p
                            style={{
                              color: "black",
                              fontWeight: "bold",
                              marginRight: "4px",
                            }}
                          >
                            Size :
                          </p>
                          {data?.size}
                        </div>
                        <div className={styles.cartItemInfo}>
                          <p
                            style={{
                              color: "black",
                              fontWeight: "bold",
                              marginRight: "4px",
                            }}
                          >
                            Price :
                          </p>
                          {priceCalculator(
                            data?.productDetails.price,
                            data?.size
                          ) + " "}
                          <CurrencyRupeeIcon className={styles.rupee} />
                        </div>
                        <button
                          className={styles.cartItemRemove}
                          onClick={(e) => {
                            HandleRemoveItemFromCart(e, data._id);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                      <div className={styles.qntBtns}>
                        <button
                          className={styles.addBtn}
                          onClick={(e: any) => {
                            UpdateCartItemQuantity(
                              e,
                              data?._id,
                              data?.quantity + 1,
                              index
                            );
                          }}
                        >
                          <AddIcon />
                        </button>
                        <div className={styles.qnt}>{data?.quantity}</div>
                        <button
                          className={styles.removeBtn}
                          onClick={(e: any) => {
                            UpdateCartItemQuantity(
                              e,
                              data?._id,
                              data?.quantity - 1,
                              index
                            );
                          }}
                        >
                          <RemoveIcon />
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* checkout */}
            <div className={styles.checkout}>
              <h2 className={styles.checkoutHeading}>subtotal</h2>
              <div className={styles.subtotal}>
                {resCartItem && calculateTotalPrice(resCartItem)}{" "}
                <CurrencyRupeeIcon className={styles.rupee} />
              </div>
              <button
                className={styles.checkoutBtn}
                onClick={(e) => handleCreateOrder(e)}
              >
                checkout
              </button>
              <div
                style={{ marginTop: "10px" }}
                className={styles.continueShopting}
                onClick={() => router.push("/shop")}
              >
                {" "}
                Continue Shopping →
              </div>
              <div
                style={{ marginTop: "2px" }}
                className={styles.emptyCart}
                onClick={(e) => {
                  HandleEmptyCart(e);
                }}
              >
                {" "}
                Empty cart →
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.cartIsEmpty}>
            There are no items in your cart.{" "}
            <span onClick={() => router.push("/shop")}>
              {" "}
              Continue Shopping →
            </span>{" "}
          </div>
        )
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <ClipLoader
            color="blue"
            cssOverride={{}}
            size={50}
            speedMultiplier={0.5}
          />
          <div>loading...</div>
        </div>
      )}
    </div>
  );
};

export default withAuth(Cart);
