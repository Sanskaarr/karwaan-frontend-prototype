"use client"
import React from 'react';
import { useEffect, useState } from 'react'
import styles from './ContactForm.module.css'
import { useForm } from '@formspree/react';
import { toast } from 'react-toastify';
export default  function ContactForm() {
  type fromType={
    name:string,
    phone:string,
    email:string,
    description:string,
  }
  const [formData,setFormData]=useState<fromType>({name:"",phone:"",email:"",description:""})

  const [state, handleSubmit] = useForm("xdorbryd");
  // const [state, handleSubmit] = useForm("xwkgkgzk");
  useEffect(()=>{
    if(state.succeeded){
    toast.success("Your mail has been send");
  setFormData({name:"",phone:"",email:"",description:""})
}
  },[state.succeeded])
  
    return (

    // <form className={styles.contactForm}  action="mailto:yashgupta1mole@gmail.com" method='post' encType='text/plain' >
    <form className={styles.contactForm}  onSubmit={handleSubmit} >
    <div className={styles.userName}>       
     <input className={styles.inputField} type="text" name='userName' id='userName' value={formData.name} 
     onChange={(e)=>{
      setFormData({...formData,name:e.target.value});
     }}  required/>
    <label className={`${styles.nameLable}${styles.lables}`}>Name</label>
    </div>
    <div className={styles.phone}>     
     <input className={styles.inputField} type="number" name='phone' id='phone' value={formData.phone} 
     onChange={(e)=>{
      setFormData({...formData,phone:e.target.value});
     }}  required/>
    <label className={`${styles.phoneLable}${styles.lables}`}> Mobile Number</label>
    </div>
    <div className={styles.email}>      
     <input className={styles.inputField} type="text" name='email' id='email' value={formData.email} 
     onChange={(e)=>{
      setFormData({...formData,email:e.target.value});
     }} required/>
    <label className={`${styles.emailLable}${styles.lables}`}>Email</label>
    </div>
    <div className={styles.description}>
      <input className={styles.inputField} type="text" name='description' id='description' value={formData.description} 
     onChange={(e)=>{
      setFormData({...formData,description:e.target.value});
     }} required/>
     <label className={`${styles.descriptionLable}${styles.lables}`}>Description  </label>
    </div>
    <button className={styles.sendMail} disabled={state.submitting}>Send Mail</button>
  </form>
  )
}