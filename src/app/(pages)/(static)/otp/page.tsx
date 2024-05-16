'use client'
//otpInputs.js
import React, { useState } from "react";
import Styles from '@/component/OTPInput/otpInput.module.css'; //remove this line if you are using react
import styles from './style.module.css'
import OTPInput from "@/component/OTPInput/OTPInput";
import { ClipLoader } from 'react-spinners';
import { useAppSelector } from '@/redux/hooks';
import { useUser } from '@/hooks/useUser';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import withAuth from '@/component/RoutesProtect/withAuth';


//Our parent component
const OTPInputGroup = () => {
  const router = useRouter();
  if (typeof window !== 'undefined') {
    var _id = JSON.parse(localStorage.getItem('user') as string)?._id;
    var token = JSON.parse(localStorage.getItem('user') as string)?.token;
  }
  const { handleSendOtp } = useUser({ token: token, _id: _id });
  // const [otp, setOtp] = useState<string>("");
  const isVerifyLoading: boolean = useAppSelector((state: any) => state.userRequest.otp.loading);
  //state to store all input boxes    
  const [inputValues, setInputValues] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    // Add more input values here
  });

  //this function updates the value of the state inputValues
  const handleInputChange = (inputId: string, value: string) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [inputId]: value,
    }));
  };
  //this function processes form submission
  const handleSubmit = () => {
    // ... Your submit logic here
  };
  //return child component
  return (
    <div className={styles.VerifyMail} >
      <h1>Verify Mail</h1>

      <div id='OTPInputGroup' className={Styles.digitGroup} data-autosubmit="true">
        <OTPInput
          id="input1"
          value={inputValues.input1}
          onValueChange={handleInputChange}
          previousId={null}
          handleSubmit={handleSubmit}
          nextId="input2"
        />
        <OTPInput
          id="input2"
          value={inputValues.input2}
          onValueChange={handleInputChange}
          previousId="input1"
          handleSubmit={handleSubmit}
          nextId="input3"
        />
        <OTPInput
          id="input3"
          value={inputValues.input3}
          onValueChange={handleInputChange}
          previousId="input2"
          handleSubmit={handleSubmit}
          nextId="input4"
        />
        <OTPInput
          id="input4"
          value={inputValues.input4}
          onValueChange={handleInputChange}
          previousId="input3"
          handleSubmit={handleSubmit}
          nextId="input5"
        />
      </div>
      <button className={styles.Signin}
        onClick={(e) => {
          e.preventDefault();
          handleSendOtp(e, parseInt(Object.values(inputValues).join(""), 10));
          setInputValues({
            input1: '',
            input2: '',
            input3: '',
            input4: '',
          })
        }} >
        {!isVerifyLoading ? "Verify OTP" :
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ClipLoader color="white" size={15} speedMultiplier={0.5} />
          </div>}
      </button>
    </div>
  );
}
export default withAuth(OTPInputGroup);
