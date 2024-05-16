"use client";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import styles from "../products/my-account/style.module.css";
import withAuth from "@/component/RoutesProtect/withAuth";
import { useAddress } from "@/hooks/useAddress";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { changeAddress_success } from "@/redux/reducers/AddressReqestReducer";
function AddressForm() {
  const router = useRouter();
  const dispatch=useDispatch();
    const order= useSelector((state:RootState)=>state.orderRequests.order);
  if (typeof window !== "undefined") {
    var token = JSON.parse(localStorage.getItem("user") as string)?.token;
    var _id = JSON.parse(localStorage.getItem("user") as string)?._id;
    if(!order.linkToPaymentGateway ){ router.push(`${order.reDirectTo??'/products/cart'}`);}

  }

  type formType = {
    houseNumber: string;
    buildingName: string;
    country: string;
    state: string;
    city: string;
    street: string;
    pin: string;
  };
  const [formData, setFormData] = useState<formType>({
    houseNumber: "",
    buildingName: "",
    country: "",
    state: "",
    city: "",
    street: "",
    pin: "",
  });
  // calling apis
  const { handleGetAddress } = useAddress({
    userId: _id,
    token: token,
    address: formData,
  });
  useEffect(() => {
    (async () => {
      const data = await handleGetAddress();
      if (data?.length) {
        setFormData({
          houseNumber: data[0].houseNumber,
          buildingName: data[0].buildingName,
          country: data[0].country,
          state: data[0].state,
          city: data[0].city,
          street: data[0].street,
          pin: data[0].pin,
        });
      }
    })();
  }, []);

  return (
    <>
      <h1 className={styles.heading}>Confirm your Address</h1>
      <div
        className={styles.myAccount}
        style={{ gridTemplateColumns: "1fr", justifyContent: "center" }}
      >
        {/* change fields */}
        <form
          className={styles.myAccountForm}
          style={{ justifySelf: "center", maxWidth: "550px" }}
        >
            <>
          {/* house number */}
          <div className={styles.userName}>
            <input
              className={styles.inputField}
              type="text"
              name="houseNumber"
              id="houseNumber"
              value={formData.houseNumber}
            />
            <label className={`${styles.nameLable}`}>House Number</label>
          </div>
          {/* building number */}
          <div className={styles.userName}>
            <input
              className={styles.inputField}
              type="text"
              name="buildingName"
              id="buildingName"
              value={formData.buildingName}
            />
            <label className={`${styles.nameLable}`}>Building Name</label>
          </div>
          {/* country */}
          <div className={styles.userName}>
            <input
              className={styles.inputField}
              type="text"
              name="country"
              id="country"
              value={formData.country}
            />
            <label className={`${styles.nameLable}`}>Country</label>
          </div>
          {/* state */}
          <div className={styles.userName}>
            <input
              className={styles.inputField}
              type="text"
              name="state"
              id="state"
              value={formData.state}
            />
            <label className={`${styles.nameLable}`}>State</label>
          </div>
          {/* city */}
          <div className={styles.userName}>
            <input
              className={styles.inputField}
              type="text"
              name="city"
              id="city"
              value={formData.city}
            />
            <label className={`${styles.nameLable}`}>city</label>
          </div>
          {/*  street */}
          <div className={styles.userName}>
            <input
              className={styles.inputField}
              type="text"
              name="street"
              id="street"
              value={formData.street}
            />
            <label className={`${styles.nameLable}`}>street</label>
          </div>
          {/* pin */}
          <div className={styles.userName}>
            <input
              className={styles.inputField}
              type="number"
              name="pin"
              id="pin"
              value={formData.pin}
            />
            <label className={`${styles.nameLable}`}>pin</label>
          </div>
            </>

          <div className={styles.addressBtn}>
            <button className={styles.submitButton}
              onClick={(e) => {e.preventDefault();
                    toast.success("your order have been placed");
                    dispatch(changeAddress_success(true));
                    router.push(`${order.reDirectTo??'/products/cart'}`);
                // window.open(linkTopamentGateway);
            
              }}
              style={{ background: "black", pointerEvents: "all" }}
            >
              Confirm address
            </button>
            <Button
              onClick={() => router.push("/address")}
              className={styles.submitButton}
              style={{ width: "50px", height: "140px" }}
            >
              Change address
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default withAuth(AddressForm);
