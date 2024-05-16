'use client'
import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import withAuth from '@/component/RoutesProtect/withAuth'
import { useOrder } from '@/hooks/UseOrder'
import { ClipLoader } from 'react-spinners'
import { useProduct } from '@/hooks/useProduct'
function page() {
  if (typeof (window) !== 'undefined') {

    var token = JSON.parse(localStorage.getItem("user") as string)?.token;
    var _id = JSON.parse(localStorage.getItem("user") as string)?._id;
    var { handleGetMyOrders } =  useOrder({token:token,userId:_id});
  }
  const [response, setResponse] = useState<any[] | null>(null);
  useEffect(() => {

    (async () => {
      let data = await handleGetMyOrders();
      setResponse(data.data);
    })();
  }, [])
  console.log("response", response);
  // fetching products info by productsId
  const { handleGetSingleProduct } = useProduct();



  return (
    <div className={styles.myOrders}>
      <h1>my orders</h1>
      {
        response ? response.length ?
          response.map( (data) => {
            // let ProductInfo;

            // if (data.products[index]) {
            //   ProductInfo = await handleGetSingleProduct(data.products[index]);
            // }
            // console.log("ProductInfo",ProductInfo, data.amount);

            return (
              <div className={styles.userCard} key={data._id} >

                 {/* {
                  ProductInfo?.media?.data ?
                    <img src={"data:image/jpeg;base64,"+ProductInfo?.media?.data} className={styles.userAvtar} alt='not found' />
                    :
                    <ClipLoader color="blue" cssOverride={{}} size={20} speedMultiplier={0.5} />
                } */}
                {/* <div className={styles.userInfo}> */}
                  {/* <div><span className={styles.userDetails}>Name: </span>{ProductInfo?.name}</div> */}
                  <div><span className={styles.userDetails}>Amount: </span>{data.amount}</div>
                  <div><span className={styles.userDetails}>Order Id: </span>{data._id}</div>
                  <div><span className={styles.userDetails}>Status: </span>{data.status && data.status}</div>

                {/* </div> */}

              </div>)
          })

          :
          <div style={{ position: "absolute", transform: "translate(-50%,-50%)", left: "50%", top: "50%", textAlign: "center" }}>
            You don't have any orders yet.
          </div>
          :
          <div style={{ position: "absolute", transform: "translate(-50%,-50%)", left: "50%", top: "50%" }}>
            <ClipLoader color="blue" cssOverride={{}} size={20} speedMultiplier={0.5} />
          </div>
      }
    </div>
  )
}

export default withAuth(page)