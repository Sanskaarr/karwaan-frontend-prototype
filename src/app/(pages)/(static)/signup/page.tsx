"use client"
import {  useLayoutEffect, useState } from 'react'
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
import { useAuth } from '@/hooks/useAuth';
import { useAppSelector } from '@/redux/hooks';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { ClipLoader } from 'react-spinners';

 function Signup() {
  useLayoutEffect(()=>{
    const token =JSON.parse(localStorage.getItem("user")as string)?.token;
      if(token){
          redirect("/");
      }
  },[]);
  const [formData,setFormData]=useState({firstName:"", lastName:"", email:"", password:""} );
  const router=useRouter();
  const {handleSignup} = useAuth(formData.email, formData.password, formData.firstName,formData.lastName);
  const {loading} = useAppSelector((state) => state.userRequest.signup);
  const [isPassVisible,setIsPassVisible]=useState(false);
    return (
        <div className={styles.login}>
            <Splide
      options={ {
        type         : 'loop',
        gap          : '1rem',
        autoplay     : true,
        pauseOnHover : true,
        resetProgress: true,
        height       : '100%',
      } }
      aria-label="My Favorite Images"
      className={styles.sideslider}
     >
      <SplideSlide data-splide-interval="2000" className={styles.SignUpSliderSlide}>
        <img className={styles.images} src="https://trekmunk.b-cdn.net/insanetraveller/images/home_stills_preview_1.jpg"  alt="Image 1"/>

      </SplideSlide>
    <SplideSlide data-splide-interval="2000" className={styles.SignUpSliderSlide}>
        <img className={styles.images} src="https://trekmunk.b-cdn.net/insanetraveller/images/home_stills_preview_4.jpg"  alt="Image 2"/>
      </SplideSlide>
    <SplideSlide data-splide-interval="2000" className={styles.SignUpSliderSlide}>
        <img className={styles.images} src="https://trekmunk.b-cdn.net/insanetraveller/images/home_stills_preview_3.jpg"  alt="Image 3"/>
      </SplideSlide>
     
    </Splide>
            {/* </div> */}
    <form className={styles.contactForm} >
            <h1>Sign up</h1>
    <div className={styles.userName}>       
     <input className={styles.inputField} type="text" name='userFName' id='userFName' 
       value={formData.firstName} 
       onChange={(e)=>{
      setFormData({...formData,firstName:e.target.value})
       }} required/>
    <label className={styles.lables}>First Name</label>
    </div>
    <div className={styles.userName}>       
     <input className={styles.inputField} type="text" name='userLName' id='userLName' 
     value={formData.lastName} 
     onChange={(e)=>{
    setFormData({...formData,lastName:e.target.value})
     }} required/>
    <label className={styles.lables}>Last Name</label>
    </div>
    <div className={styles.email}>      
     <input className={styles.inputField} type="text" name='email' id='email'
       value={formData.email} 
       onChange={(e)=>{
      setFormData({...formData,email:e.target.value})
       }} required/>
    <label className={styles.lables}>Email</label>
    </div>
    <div className={styles.password}>     
     <input className={styles.inputField} type={isPassVisible?"text":"password"} name='password' id='password' 
       value={formData.password} 
       onChange={(e)=>{
      setFormData({...formData,password:e.target.value})
       }} required/>
    <label className={styles.lables}>password</label>
       <div className={styles.visibility} onClick={()=>setIsPassVisible(!isPassVisible)}>{isPassVisible?<VisibilityOutlinedIcon/>:<VisibilityOffOutlinedIcon/>}</div>
    </div>
  
    <button className={styles.Signup} onClick={(e)=>{handleSignup(e)}} >{loading?
    <div style={{display:"flex",alignItems:"center", justifyContent:"center"}}>
 <ClipLoader  color="white" cssOverride={{}}  size={15} speedMultiplier={0.5}/>
</div>:
"Sign up" }
    </button>
    <div className={styles.forgotPassword} onClick={()=>router.push("/signin")}>Returning Customer? Sign In →</div>

  </form>
  </div>
  )
}
export default Signup;