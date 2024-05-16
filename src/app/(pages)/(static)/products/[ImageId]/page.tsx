"use client";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { useParams, useRouter } from "next/navigation";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useProduct } from "@/hooks/useProduct";
import { useCart } from "@/hooks/useCart";
import { toast } from "react-toastify";
import { useOrder } from "@/hooks/UseOrder";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { changeAddress_success } from "@/redux/reducers/AddressReqestReducer";
import { createOrder_success } from "@/redux/reducers/OrderRequestReducer";

const shop = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const resCartItem = useSelector((state: RootState) => state.cart.products);
  type validSize = '8"x12"' | '12"x18"' | '16"x24"' | '20"x30"' | '24"x36"';
  const [selectedSize, setSelectedSize] = useState<validSize>('8"x12"');
  const { ImageId } = useParams<{ ImageId: string }>();
  const [isItemInCart, setIsItemInCart] = useState<boolean>(false);
  const isAddressConfirm = useSelector(
    (state: RootState) => state.addressRequest.changeAddress.confirm
  );
  const order = useSelector(
    (state: RootState) => state.orderRequests.order
  );
  const { handleGetProduct, handleGetAllProduct, response, singleResponse } =
    useProduct(null, null, null, ImageId);
  // price according to size
  const priceCalculator = (price: number) => {
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

  if (typeof window !== "undefined") {
    var token = JSON.parse(localStorage.getItem("user") as string)?.token;
    var _id = JSON.parse(localStorage.getItem("user") as string)?._id;
    var { handleCreateOrder } = useOrder({token:token,userId:_id});
    var { handleAddItemToCart, handleGetAllItem } = useCart({
      token: token,
      productId: ImageId,
      userId: _id,
      size: selectedSize,
      quantity: 1,
    });

    //    if some one click on buy now and his/her address is confirm;
    if (isAddressConfirm && order.linkToPaymentGateway) {
      let link = order.linkToPaymentGateway;
      dispatch(changeAddress_success(false));
      dispatch(createOrder_success({linkToPaymentGateway:"",reDirectTo:""}));
      window.open(link);
    }
  }
  // checking if my current item is in the cart or not
  function isProductInCart(productId: string, size: validSize): boolean {
    for (const item of resCartItem) {
      if (item.productDetails.productId === productId && item.size === size) {
        return true;
      }
    }
    return false;
  }
  useEffect(() => {
    if (singleResponse) {
      setIsItemInCart(isProductInCart(singleResponse._id, selectedSize));
    }
  }, [singleResponse]);
  // geting all items and storing in redux state
  useEffect(() => {
    handleGetAllItem();
  }, [token, _id]);

  const handleBuy = (e: any) => {
    if (token) {
      e.preventDefault();
      const  updatedResCartItems: resDataType[] = [{
        productDetails: {
            productId: singleResponse._id,
            description: singleResponse.description,
            name: singleResponse.name,
            price: singleResponse.price,
            tags: singleResponse.tags,
            url: singleResponse.url,
        },
        quantity: 1,
        size:selectedSize, 
        userId: singleResponse.userId,
        _id: singleResponse._id,
    }];
      handleCreateOrder(e,updatedResCartItems);
    } else {
      toast.error("Please log in to buy the product");
      router.push("/signup");
    }
  };

  useEffect(() => {
    // Call the handleGetAllProduct function when the component mounts or when dependencies change
    handleGetProduct();
    handleGetAllProduct();
  }, [ImageId]);

  // read more feature
  const [isReadMoreOpen, setIsReadMoreOpen] = useState<boolean>(false);

  return (
    <div className={styles.singleProductPage}>
      {/* <div className={styles.singleProductPageSlider}>
        <div className={styles.singleProductPageSliderButton} onClick={()=>router.push(`/products/${response[response.findIndex((obj:any) => {obj._id === singleResponse._id||obj.media.type === singleResponse.media.type})-1]._id}`)}><KeyboardArrowLeftIcon  style={{backgroundColor:"white",color:"black"}} className={styles.icons}/></div>
        <div className={styles.singleProductPageSliderButton} onClick={()=>router.push(`/products/${response[response.findIndex((obj:any) => {obj._id === singleResponse._id||obj.media.type === singleResponse.media.type})+1]._id}`)}><KeyboardArrowRightIcon style={{backgroundColor:"white",color:"black"}} className={styles.icons}/></div>
    
        </div> */}

      {singleResponse ? (
        <>
          {" "}
          <div className={styles.singleProductPageUpperSection}>
            <div className={styles.singleProductPageUpperLeftSection}>
              {singleResponse && (
                <img
                  src={singleResponse.url}
                  style={{ objectFit: "cover" }}
                  alt={singleResponse.name}
                />
              )}
            </div>
            <div className={styles.singleProductPageUpperRightSection}>
              <div>
                {singleResponse && (
                  <h3 style={{ color: "black" }}>{singleResponse.name}</h3>
                )}
                {singleResponse && <div>{singleResponse.tags.join(", ")}</div>}
                {singleResponse && (
                  <h3 style={{ color: "black" }}>
                    {priceCalculator(singleResponse.price) + " "}
                    <CurrencyRupeeIcon />
                  </h3>
                )}
              </div>
              {/* {singleResponse&& <p>{singleResponse.description}    </p>} */}
              {singleResponse && (
                <p>
                  {isReadMoreOpen
                    ? singleResponse.description
                    : singleResponse.description.slice(0, 150) + "..."}
                  {singleResponse.description ===
                  singleResponse.description.slice(0, 150) ? (
                    <div></div>
                  ) : isReadMoreOpen ? (
                    <div
                      className={styles.read}
                      onClick={() => setIsReadMoreOpen((e) => !e)}
                    >
                      Read Less <KeyboardArrowUpIcon />{" "}
                    </div>
                  ) : (
                    <div
                      className={styles.read}
                      onClick={() => setIsReadMoreOpen((e) => !e)}
                    >
                      Read More <KeyboardArrowDownIcon />
                    </div>
                  )}{" "}
                </p>
              )}
              <p style={{ alignSelf: "flex-end" }}>SIZE</p>
              <select
                style={{
                  borderRadius: "5px",
                  background: "white",
                  outline: "0",
                  border: "1px solid black",
                  color: "black",
                }}
                value={selectedSize}
                onChange={(e) => {
                  setSelectedSize(e.target.value as validSize);
                  setIsItemInCart(
                    isProductInCart(
                      singleResponse._id,
                      e.target.value as validSize
                    )
                  );
                }}
              >
                <option value={'8"x12"'}>8" X 12"</option>
                <option value={'12"x18"'}>12" X 18"</option>
                <option value={'16"x24"'}>16" X 24"</option>
                <option value={'20"x30"'}>20" X 30"</option>
                <option value={'24"x36"'}>24" X 36"</option>
              </select>
              <div className={styles.buttons}>
                {isItemInCart ? (
                  <button
                    className={styles.button}
                    onClick={() => toast.error("Item is already in your cart.")}
                  >
                    Item is Added
                  </button>
                ) : (
                  <button
                    className={styles.button}
                    onClick={(e: any) => {
                      if (token) {
                        handleAddItemToCart(e, ImageId, selectedSize);
                        handleGetAllItem();
                      } else {
                        toast.error("Please login first... ");
                        router.push("/signup");
                      }
                      setIsItemInCart(true);
                    }}
                  >
                    Add To Cart
                  </button>
                )}
                <button className={styles.button} onClick={(e) => handleBuy(e)}>
                  Buy
                </button>
              </div>
            </div>
          </div>
          <p className={styles.shopProductsHeading}>
            New Modern Design Collection
          </p>
          <div className={styles.shopProducts}>
            {response &&
              singleResponse &&
              response
                .filter(
                  (product: any) =>
                    product._id !== singleResponse?._id &&
                    product?.media?.type === singleResponse?.media?.type
                )
                .slice(0, 3)
                .map((data: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className={styles.oneProduct}
                      onClick={() => router.push(`/products/${data._id}`)}
                    >
                      <img
                        src={data.url}
                        alt={data.name}
                        className={styles.image}
                      />
                      <div className={styles.imagesCategory}>
                        {data.tags.join(", ")}
                      </div>
                      <div className={styles.imagesName}>{data.name}</div>
                    </div>
                  );
                })}
          </div>
        </>
      ) : (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ClipLoader
            color="blue"
            cssOverride={{}}
            size={30}
            speedMultiplier={0.5}
          />
          <div style={{ color: "black" }}>loading</div>
        </div>
      )}
    </div>
  );
};
export default shop;
