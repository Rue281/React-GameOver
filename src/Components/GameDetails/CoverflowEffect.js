
import React from 'react';
// import Swiper from 'react-id-swiper';
// css
// import 'swiper/css/swiper.css'

import banner from '../../assets/banner.jpg'

// import { Swiper, SwiperSlide } from 'swiper/react'
// import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from 'swiper'
// import 'swiper/swiper-bundle.css'

// SwiperCore.use([Navigation]);
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";



const CoverflowEffect = ({shots}) => {
  const params = {
    loop: true,
    speed: 1000,
    autoplay: {
        delay: 3000,
    },
    effect: 'coverflow',
    centeredSlides: true,
    slidesPerView: 2,
    coverflowEffect: {
      rotate: 0, // Slide rotate in degrees
      stretch: 40, // Stretch space between slides (in px)
      depth: 300, // Depth offset in px (slides translate in Z axis)
      modifier: 1, // Effect multipler
      slideShadows: false // Enables slides shadows
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    spaceBetween: 30
  };

  console.log(shots.map(item =>item.image))

  return (
    <Swiper {...params}>
      {shots ? 
      shots.map((item,index) => (
        <img key={index} src={item.image} alt="swipe" />
      )) : ""
      }
      {/* <img src="https://picsum.photos/200/300" alt="swipe" /> */}
    </Swiper>
  )
};

export default CoverflowEffect;
  