'use client'
import { useOrder } from '@/hooks/UseOrder';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import { ClipLoader } from 'react-spinners';
import withAuth from '@/component/RoutesProtect/withAuth';
import DownloadButton from '@/component/downloadImage/DownloadButton';
import { useRouter } from 'next/navigation';
function page (){
const[checkoutResponse,setCheckoutResponse]=useState<any>(null);
  const router =useRouter();
const {orderId} = useParams<{ orderId: string }>()
if(typeof(window)!=="undefined"){
  var token=JSON.parse(localStorage.getItem("user") as string)?.token;

  if(!token){
    router.push('/');
  }
  var {updateOrderPaymentStatus}=useOrder({token:token, orderId:orderId});
}
// const checkOutData=async()=> {if(orderId && token ){
//   setCheckoutResponse( await updateOrderPaymentStatus())
//  }}
useEffect(() => {
  const updateOrderPaymentStatusAsync = async () => {
      if (orderId && token) {
          const response = await updateOrderPaymentStatus();
          setCheckoutResponse(response);

      }
  };
  updateOrderPaymentStatusAsync();

}, [orderId, token]);
  return (
    <div className={styles.payment_status}>

      {false?
      <div className={styles.paymentStatusMessage}>
        <img className={styles.paymentStatusImg} src="/paymentFail.png" alt="not found" />
       {checkoutResponse?
       <>
        <p>{checkoutResponse.message}</p>
        <p>{`payment_id is : ${checkoutResponse?.data?.order_details?.payment_id}`}</p>
        <p>{`orderID is :${orderId}`}</p>
        <p>{`amount is ${checkoutResponse?.data?.order_details.amount}` }</p>
       </>:
         <div style={{display:"flex",alignItems:"center", justifyContent:"center"}}>
         <ClipLoader  color="blue" cssOverride={{}}  size={15} speedMultiplier={0.5}/>
        </div>
      }
      </div>
      :
      <div className={styles.paymentStatusMessage}>
      <img className={styles.paymentStatusImg} src="/payment successfull.png" alt="not found" />
     {checkoutResponse? <>
        {/* <p style={{whiteSpace:"nowrap",fontSize:"12px",width:"90%", maxWidth:"350px",overflow: "hidden",textOverflow: "ellipsis",  }}> <DownloadButton imageUrl={imageUrl} fileName={fileName} /></p> */}
        <p className={styles.message} style={{whiteSpace:"nowrap",fontSize:"20px",overflow: "hidden",textOverflow: "ellipsis", textAlign:"center" ,fontWeight:"bold"}}>{checkoutResponse?.message}</p>
        <p className={styles.message} style={{whiteSpace:"nowrap",fontSize:"20px",overflow: "hidden",textOverflow: "ellipsis",  }}><span style={{fontWeight:"bold"}}>amount is :</span>{` ${checkoutResponse?.data?.order_details?.amount}` }</p>
        <p className={styles.message} style={{whiteSpace:"nowrap",fontSize:"20px",overflow: "hidden",textOverflow: "ellipsis",  }}><span style={{fontWeight:"bold"}}>payment_id is :</span>{` ${checkoutResponse?.data?.order_details?.payment_id}`}</p>
        <p className={styles.message} style={{whiteSpace:"nowrap",fontSize:"20px",overflow: "hidden",textOverflow: "ellipsis",  }}><span style={{fontWeight:"bold"}}>orderID is :</span> {` ${orderId}`}</p>
      </>
     :
        <div style={{display:"flex",alignItems:"center", justifyContent:"center"}}>
        <ClipLoader  color="blue" size={20} speedMultiplier={0.5}/>
       </div>}
       </div>

     }
      </div>
  )
}

export default page;