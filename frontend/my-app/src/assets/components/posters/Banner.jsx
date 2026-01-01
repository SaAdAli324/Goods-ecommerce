import React from 'react'
import ImageSlider from '../imageSlider/ImageSlider'
import BannerSlider from '../imageSlider/BannerSlider'
import { useEffect, useState } from 'react'
import FadeInSection from '../FadeAnimation/FadeInSection.jsx'
const banner = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL
  const [posters, setPosters] = useState([])
  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const response = await fetch(`${backendURL}/api/banner/display`);
        const data = await response.json();
        console.log("banner data:", data.banners);
        const banner = data
       const banners = data.banners.flatMap(b => b.bannerImage); //
        setPosters(banners)

      } catch (error) {
        console.error("Error fetching posters:", error);
      }
    }
    fetchPosters();
  }, [])
  console.log("thisi si the p ostyer ", posters);


  return (
    <div className=' mx-auto   overflow-hidden max-lg:h-fit '>
      <FadeInSection>
      <BannerSlider images={posters} backendURL={backendURL} />
    </FadeInSection>
    </div>
  )
}

export default banner
