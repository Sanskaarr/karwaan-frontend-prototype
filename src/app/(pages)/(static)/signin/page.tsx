"use client"
import {   useLayoutEffect, useState } from 'react'
import styles from './style.module.css'
import '@splidejs/react-splide/css';
// or other themes
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';

// or only core styles
import '@splidejs/react-splide/css/core';
import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { redirect, useRouter } from 'next/navigation';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useAppSelector } from '@/redux/hooks';
import { useAuth } from '@/hooks/useAuth';
import { ClipLoader } from 'react-spinners';
 function Signin() {
   useLayoutEffect(()=>{
    const token =JSON.parse(localStorage.getItem("user")as string)?.token;
      if(token){
          redirect("/");
      }
  },[]);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isPassVisible, setIsPassVisible] = useState(false);
  const { handleSignin } = useAuth(formData.email, formData.password);
  const { loading } = useAppSelector((state) => state.userRequest.signin);
  const router = useRouter();
  return (
    <div className={styles.login}>
      <Splide
        options={{
          type: 'loop',
          gap: '1rem',
          autoplay: true,
          pauseOnHover: true,
          resetProgress: true,
          height: '100%',
        }}
        aria-label="My Favorite Images"
        className={styles.sideslider}
      >
        <SplideSlide data-splide-interval="2000" className={styles.SigninSliderSlide}>
          <img className={styles.images} src="https://trekmunk.b-cdn.net/insanetraveller/images/home_stills_preview_1.jpg" alt="Image 1" />
        </SplideSlide>
        <SplideSlide data-splide-interval="2000" className={styles.SigninSliderSlide}>
          <img className={styles.images} src="https://trekmunk.b-cdn.net/insanetraveller/images/home_stills_preview_4.jpg" alt="Image 2" />
        </SplideSlide>
        <SplideSlide data-splide-interval="2000" className={styles.SigninSliderSlide}>
          <img className={styles.images} src="https://trekmunk.b-cdn.net/insanetraveller/images/home_stills_preview_3.jpg" alt="Image 3" />
        </SplideSlide>

      </Splide>
      <form className={styles.contactForm} >
        <h1>sign In</h1>
        <div className={styles.email}>
          <input className={styles.inputField} type="text" name='email' id='email' value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value })
            }} required />
          <label className={`${styles.emailLable}${styles.lables}`}>Email</label>
        </div>
        <div className={styles.password}>
          <input className={styles.inputField} type={isPassVisible ? "text" : "password"} name='password' id='password'
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value })
            }} required />
          <label className={`${styles.passwordLable}${styles.lables}`}>password</label>
          <div className={styles.visibility} onClick={() => setIsPassVisible(!isPassVisible)}>{isPassVisible ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}</div>
        </div>

        <button className={styles.Signin} onClick={handleSignin}style={!loading ? { display: "flex",pointerEvents:"all"}:{ display: "flex",pointerEvents:"none"}}>
         {!loading ? "Sign In":
          <div >
            <ClipLoader color="white" cssOverride={{}} size={15} speedMultiplier={0.5} />
          </div>}
        </button>
        <div className={styles.links}>
          <div className={styles.forgotPassword} onClick={() => router.push("/forgot-password")}>Forgot password?</div>
          <div className={styles.forgotPassword} onClick={() => router.push("/signup")}>New Customer? Sign up →</div>
        </div>
      </form>
    </div>
  )
}
export default Signin;