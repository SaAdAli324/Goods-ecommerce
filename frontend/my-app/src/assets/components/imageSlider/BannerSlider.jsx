import React, { useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import "swiper/css/autoplay";

import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import FadeInSection from "../FadeAnimation/FadeInSection";
import { div } from "framer-motion/client";




export default function BannerSlider({ images = [], backendURL, imageClass = "" }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    console.log("these are images in slider", images);
    return (
      <div className="flex">
        <div className="w-full h-[90vh] max-md:h-[60vh]   ">
       
          <video className="w-full h-full  object-fill " src="videos/brandVideo.mp4" autoPlay
        loop
        muted
        playsInline>

          </video>
     
         
        </div>
    
        </div>
    )
}