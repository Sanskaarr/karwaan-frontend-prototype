'use client'
import React, { useState } from 'react'
import styles from './style.module.css'
import { ClipLoader } from 'react-spinners';
import { useAppSelector } from '@/redux/hooks';
import { useUser } from '@/hooks/useUser';
const forgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const isForgetLoading: boolean = useAppSelector((state: any) => state.userRequest.forgotPassword.loading);
  const { handleForgetPasswordUser } = useUser({});
  return (
    <div className={styles.VerifyMail} >
      <form className={styles.contactForm} >
        <h1>Verify Mail</h1>
        <div className={styles.email}>
          <input className={styles.inputField} type="text" name='email' id='email' value={email}
            onChange={(e) => {
              e.preventDefault();
              setEmail(e.target.value);
            }}
            required />
          <label className={styles.lables}>Email</label>
        </div>
        <button className={styles.Signin} onClick={(e) => handleForgetPasswordUser(e, email)}>
          {isForgetLoading ?
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ClipLoader color="white" cssOverride={{}} size={15} speedMultiplier={0.5} />
            </div> : "Verify Mail"}</button>



      </form>
    </div>
  )
}

export default forgotPassword
