'use client'
import React, { useEffect } from 'react'
import styles from './style.module.css'
import { useRouter } from 'next/navigation'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useProduct } from '@/hooks/useProduct';
import {  useScroll, useTransform } from 'framer-motion';
import InstagramWidget from '@/component/InstagramWidget/InstagramWidget';
import { ClipLoader } from 'react-spinners';

const shop = () => {
    const { handleGetAllProduct, response } = useProduct();

    useEffect(() => {
      // Call the handleGetAllProduct function when the component mounts or when dependencies change
         AOS.init({
                duration: 800,
                once: false,
            })
      handleGetAllProduct();
    }, []);
  
      const router = useRouter();
    const {scrollYProgress}=useScroll();
    let y=useTransform(scrollYProgress,[0,1],["0%","50%"]);
    return (
        <div className={styles.shop}>
            
            <div  className={styles.shopBanner} data-aos="fade-up"><p>Karwaan Prints</p>
                <button className={styles.shopNow} onClick={() => router.push("/products")}>Shop Now</button></div>
            <div className={styles.shopProductSection}>
                <div className={styles.shopProductOurPrints} data-aos="fade-up">Our Prints</div>
            </div>
            <div className={styles.shopProducts} >
                {response?response.slice(0, 6).map((data:any, index:number) => {
                    return (
                        <div data-aos="fade-up" key={index} className={styles.oneProduct}  onClick={()=>router.push(`/products/${data._id}`)}>
                            <img src={data.url} alt={data.name} className={styles.image} />
                            <div className={styles.imagesCategory}>{data.tags.join(", ")}</div>
                            <div className={styles.imagesName}>{data.name}</div>

                        </div>)
                }):<div
                 style={{display:"flex",
                 alignItems:"center",
                 flexDirection:"column",
                  justifyContent:"center",
                  width:"100vw",
                  marginTop:"30px"
                //    position:"absolute",
                    // transform:"translate(-50%,-50%)",
                    // top:"50%",left:"50%"
                    }}>
                <ClipLoader  color="blue"  size={30} speedMultiplier={0.5}/>
                <p style={{color:"black"}}>loading</p>
               </div>

                }
            </div>
            <div className={styles.BigShopProducts}>
                {response?response.slice(4, 6).map((data:any, index:number) => {
                    const animation = index % 2 === 0 ? "fade-up" : "fade-down";
                    return (

                        <div data-aos="fade-up" key={index} className={styles.BigOneProduct}>
                            <img src={data.url} alt={data.name} className={styles.image} />
                            <div className={styles.innerContainer}>
                            <div data-aos={animation} className={styles.BigImagesName}>{data.name}</div>
                            <button data-aos={animation} className={styles.BigImagesNameShopNow} onClick={() => router.push(`/products/${data._id}`)}>Shop Now</button>

                            </div>
                           
                        </div>)
                }): <div style={{display:"flex",alignItems:"center", justifyContent:"center"}}>
                <ClipLoader  color="white" cssOverride={{}}  size={15} speedMultiplier={0.5}/>
               </div>

                }
            </div>
            <InstagramWidget />
      
      
        </div>
    )
}

export default shop
