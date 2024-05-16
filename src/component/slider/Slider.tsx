"use client"

import '@splidejs/react-splide/css';
// or other themes
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';

// or only core styles
import '@splidejs/react-splide/css/core';
import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import styles from "./Slider.module.css"
export default function Slider() {

  return (
    <Splide
      options={ {
        type         : 'loop',
        gap          : '1rem',
        autoplay     : true,
        pauseOnHover : true,
        resetProgress: true,
        // height       : '15rem',
      } }
      aria-label="My Favorite Images"
     >
      <SplideSlide data-splide-interval="3000" className={styles.sliderSlide}>
        <img className={styles.betterIndia} src="https://karwaan.b-cdn.net/about/Better_India.png"  alt="Image 1"/>
        <p className={styles.review}> "aside from doing work that they enjoyed, also wanted to promote tourism in newareas, generate income for the locals, promote sustainability, and reduce pressure on the mountain environment."</p>

      </SplideSlide>
    <SplideSlide data-splide-interval="3000" className={styles.sliderSlide}>
        <img className={styles.indianExpress} src="https://karwaan.b-cdn.net/about/download_white.png"  alt="Image 2"/>
        <p className={styles.review}>"The team also escorts doctors to high-altitude regions to treat the less fortunate residents"</p>
      </SplideSlide>
     
    </Splide>
  );
}