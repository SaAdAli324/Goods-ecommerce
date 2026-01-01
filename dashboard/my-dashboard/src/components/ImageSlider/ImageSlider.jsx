import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function ImageSlider({ images = [], backendURL , customize }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="w-full h-fit">
 
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={`mySwiper2 !${customize}`}
      >
        {images.map((img) => (
          <SwiperSlide key={img.filename} onClick={(e) => e.stopPropagation()}>
            <img
              src={`${backendURL}/${img.path.replace(/\\/g, "/")}`}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>

  
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={5}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={`mySwiper `}
      >
        {images.map((img) => (
          <SwiperSlide
            key={img.filename}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              className="w-2xl h-1/2"
              src={`${backendURL}/${img.path.replace(/\\/g, "/")}`}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
