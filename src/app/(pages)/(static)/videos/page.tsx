"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import videoData from "@/constants/VideoData";
import { motion } from "framer-motion";
import styles from "./style.module.css";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from 'embla-carousel'


export default function Videos() {
  const videosContainerRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0); 
  const router = useRouter();

  const videosPageOptions = [
    {id:0,OptionName:"Documentry"},
    {id:1,OptionName:"CSR Films"},
    {id:2,OptionName:"Coperate Videos"},
    {id:3,OptionName:"Ads"},
    {id:4,OptionName:"Films"},
  ]


  const handleScroll = (direction: any) => {
    const scrollAmount = 600; // Adjust the scroll amount as needed
    const container = videosContainerRef.current;
    if (container) {
      if (direction === "left" && currentIndex !== videoData.length - 1) {
        container.scrollLeft -= scrollAmount;
        // container.scrollRight += scrollAmount;
        setCurrentIndex(currentIndex + 1);
      } else if (direction === "right" && currentIndex !== 0) {
        container.scrollLeft += scrollAmount;
        // container.scrollRight -= scrollAmount;
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  const handleMouseEnter = (e: any) => {
    e.target.play();
  };

  const handleMouseLeave = (e: any) => {
    e.target.pause();
  };
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // Use a timeout to wait for the scrolling to finish before updating the index
    setTimeout(() => {
      // Update the current index based on the visible video
      const container = videosContainerRef.current;
      if (container) {
        // Calculate the scrollRight value
        let scrollRight =
          container.scrollWidth - container.offsetWidth + container.scrollLeft;
        // Ensure scrollRight is at least 0 (on extreme left)
        scrollRight = Math.round(scrollRight);
        const visibleVideos = Math.abs(Math.round(container.scrollLeft / 600));
        const currentInd =
          scrollRight > 5
            ? Math.abs(
                Math.max(0, Math.min(videoData.length - 1, visibleVideos))
              )
            : 6;

        if (currentInd != currentIndex) {
          setCurrentIndex(currentInd);

          // Update the video name in the scroll bar
          if (videoData && videoData.length) {
            const currentVideo = videoData[currentInd];
            // Display the current video name wherever you need it
          }
        }
      }
    }, 500);
  };
  // const handleScrollOnHover = (e: React.WheelEvent<HTMLDivElement>) => {

  //   // Use a timeout to wait for the scrolling to finish before updating the index
  //   setTimeout(() => {

  //     // Update the current index based on the visible video
  //     const container = videosContainerRef.current;
  //     if (container) {
  //             // Calculate the scrollRight value
  //     let scrollRight = container.scrollWidth - container.offsetWidth + container.scrollLeft;
  //           // Ensure scrollRight is at least 0 (on extreme left)
  //           scrollRight = Math.round(scrollRight);
  //       const visibleVideos = Math.abs(Math.round(container.scrollLeft / 600));
  //       const currentInd =  (scrollRight>5)?Math.abs( Math.max(0, Math.min(videoData.length - 1, visibleVideos))):6;

  //     if(currentInd!=currentIndex){
  //       setCurrentIndex(currentInd);

  //       // Update the video name in the scroll bar
  //       if (videoData && videoData.length) {
  //         const currentVideo = videoData[currentInd];
  //         // Display the current video name wherever you need it
  //       }
  //     }}
  //   }, 500);
  // };
  const [emblaRef, emblaApi] = useEmblaCarousel({
    // startIndex: videoData.length-1,
    direction:"rtl",
    align: "end",
    duration: 35,
  },[WheelGesturesPlugin()]);
  const onClickRightScroll = () =>{
    emblaApi?.scrollPrev()
  }
  const onClickLeftScroll = () =>{
    emblaApi?.scrollNext()
  }
  const [selectedSnap, setSelectedSnap] = useState(0)
  const updateScrollSnapState = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedSnap(emblaApi.selectedScrollSnap())
  }, [])
  useEffect(() => {
    if (!emblaApi) return

    updateScrollSnapState(emblaApi)
    emblaApi.on('select', updateScrollSnapState)
    emblaApi.on('reInit', updateScrollSnapState)
  }, [emblaApi, updateScrollSnapState])
  return (
    <div className={styles.videos}>
      <div className={styles.videosSection}>
        <div className={styles.videosSectionHome}>
          <span onClick={() => router.push("/")}>Home</span>
        </div>

        <motion.div
          style={{ color: "black" }}
          className={styles.motion}
          initial={{ x: 100, y: 0 }}
          animate={{ x: 0, y: 0 }}
          transition={{ ease: "easeIn", delay: 0, duration: 1 }}
        >
          <span className={styles.videosPageOptionsTitle}>
            Motion
          </span>
          
          {videosPageOptions.map((e)=><span key={e.id} className={styles.optionName}>{e.OptionName}</span>)}
        </motion.div>
        {/* <div className={styles.videosGallary} >

          <div className={styles.videosGallary }onWheel={handleWheel}
            ref={videosContainerRef}
            // onMouseOver={() => setScrollPosition(videosContainerRef.current.scrollLeft)}
            // onMouseLeave={() => setScrollPosition(0)}
          > */}

        {/* <div className={styles.embla}>
          <div className={styles.emblaViewport} ref={emblaRef}>
            <div className={styles.embla__container}>
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className={styles.embla__slide}>
                  <div className={styles.embla__slide__number}>slide</div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
        {videoData && videoData.length > 0 ? (
          <div className={styles.embla} dir="rtl">
            <div className={styles.emblaViewport} ref={emblaRef}>
              <div className={styles.embla__container}>
                {/* map */}
                {videoData.map((data: any, i) => {
               
                return(
                  <motion.a
                    className={styles.embla__slide}
                    initial={{ x: -100, y: 0,opacity:0}}
                    animate={{ x: 0, y: 0 ,opacity:1}}
                    transition={{ ease: "easeIn", delay: 0, duration: 1 }}
                    target="_blank"
                    key={data.id}
                    href={data.videoHref}
                  >
                    <motion.a style={{cursor:"pointer",width:"100%",height:"100%",position:"relative",display:"flex",overflow:"hidden"}}>
                      {/* <div className={styles.videosThumbnail}></div> */}
                      <motion.img
                        src={data.imgSrc}
                        alt={data.name}
                        className={styles.videosThumbnail}
                        // initial={{ opacity: 0.3 }}
                        // animate={{ opacity: 1 }}
                        // transition={{ ease: "easeIn", delay: 0, duration: 0.3 }}
                      />
                      <video
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        autoPlay={false}
                        muted
                        loop
                        className={styles.videoContainer}
                      >
                        <source src={data.videoHref} type="video/mp4" />
                      </video>
                    </motion.a>
                  </motion.a>
                )})}
              </div>
            </div>
          </div>
        ) : (
          <p>no data</p>
        )}

        {/* {videoData ?(videoData.length)?
              videoData.map((data: any) => (
                <>
                </>
        //         <motion.a   initial={{  x:-100 , y: 0 }}
        //         animate={{  x: 0, y: 0 }}
        //         transition={{ ease: "easeIn", delay:0, duration:0.5 }} target='_blank' key={data.id} href={ data.videoHref}>
        //         <motion.img src={data.imgSrc} alt={data.name}
        //           className={styles.videosGallarySectionImg}
        //           initial={{  opacity: 0.3 }}animate={{  opacity: 1 }} transition={{ ease: "easeIn", delay:0, duration:0.3 }} />
        //           <video   
        //            onMouseEnter={handleMouseEnter}
        //            onMouseLeave={handleMouseLeave}
        // autoPlay={false}  muted loop className={styles.videosGallarySection}>
        //             <source src={data.videoHref} type="video/mp4" />
        //           </video>

        //         </motion.a>
              )):<div className={styles.ClipLoader}>
              <ClipLoader color="blue" size={60} speedMultiplier={0.5}  />
               <div>No video is available.</div>
            </div>:
              <div className={styles.ClipLoader}>
              <ClipLoader color="blue" size={60} speedMultiplier={0.5}  />
               <div>loading</div>
            </div>
              } */}
      </div>

      {/* Scroll Bar */}
      <div className={styles.videosScrollBar}>
        <div
          className={styles.videosScrollBarLeft}
          // onClick={(e) => handleScroll("left")}
          onClick={onClickLeftScroll}
        >
          <WestIcon className={styles.videosIcons} />
          <div className={styles.videosScroll}>Scroll</div>
        </div>
        <div className={styles.videosScrollBarCenter}>
          {videoData
            ? videoData.length
              ? `${selectedSnap+1}/${videoData.length} ${
                  videoData[currentIndex]?.name
                }`
              : "No video is available"
            : ""}
        </div>
        <div
          className={styles.videosScrollBarRightSide}
          // onClick={(e) => handleScroll("right")}
          onClick={onClickRightScroll}
        >
          <div className={styles.videosScroll}>Scroll</div>
          <EastIcon className={styles.videosIcons} />
        </div>
      </div>
    </div>
  );
}
