import { div, nav } from 'framer-motion/client'
import React from 'react'
import { useState, useEffect } from 'react'
import FadeInSection from '../FadeAnimation/FadeInSection'
import { Navigate, useNavigate } from 'react-router-dom'
import Products from '../Products'
const Category = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL
  // swiper state and other states

  const [products, setProducts] = useState([])


  // useEffect to fetch products based on category filter and modal state

const navigate = useNavigate()
  useEffect(() => {
    const getProducts = async () => {
      try {

        const res = await fetch(`${backendURL}/api/product/display`)
        const data = await res.json()
        console.log(data);




        let filteredProducts = data.product
        setProducts(filteredProducts)

      } catch (err) {
        console.error("error while getting products", err);
      }
    }

    getProducts()
  }, [])
  const womenCategory = products.filter(f => f.category === "women")
  const kidsCategory = products.filter(f => f.category === "kids")
  const menCategory = products.filter(f => f.category === "men")
  console.log(womenCategory);

  console.log();

  const selectedCategory = (category)=>{
    console.log(category);
    
   navigate(`/products?category=${category}`);
  }

  return (
    <>
    <div className=' px-4 h-fit m-0 py-36  max-md:py-16 flex flex-col max-md:flex-col items-center  gap-16 '>
      <div className=' w-fit text-center max-md:w-full'>
        <FadeInSection>
          <h2 className='text-5xl ml-8 max-md:text-center  animate-bounce '>New! </h2>
          <span className=' text-9xl max-sm:text-6xl  max-md:text-center text-center text-shadow-2xl '><span className='z-40 relative'>C</span>ate<span className='z-40 relative rotate-12'>g</span>ori<span className='relative z-40'>e</span>s</span>
        </FadeInSection>
      </div>
      <div className=' flex items-center relative -top-25 justify-center space-x-10   h-fit'>
           
        {womenCategory.length > 0 && (
          <FadeInSection>
            <div className='flex justify-center  bg-amber-100 p-4 cursor-pointer  items-center  flex-col-reverse rotate-6 hover:rotate-0 hover:transform transition-all duration-200 ease-in-out' onClick={()=> selectedCategory("women") }>
              <h1 className="text-xl text-center py-2">Women</h1>

              <div className="category-card flex   max-w-[400px] max-h-[400px] min-w-0 overflow-hidden">
                <img
                  src={`${backendURL}/${womenCategory[1].productImage[0].path.replace(/\\/g, "/")}`}
                  alt="Women Category"
                  className="w-full h-full object-cover "
                />
              </div>
            
            </div>
          </FadeInSection>
        )}

  {kidsCategory.length > 0 && (
          <FadeInSection>
            <div className='flex justify-center bg-amber-100 p-4  cursor-pointer items-center  flex-col-reverse rotate-0 hover:rotate-2 hover:transform transition-all duration-200 ease-in-out' onClick={()=> selectedCategory("kids") }>
              <h1 className="text-xl text-center py-2">kids</h1>

              <div className="category-card flex   max-w-[400px] max-h-[400px] min-w-0 overflow-hidden">
                <img
                  src={`${backendURL}/${kidsCategory[1].productImage[0].path.replace(/\\/g, "/")}`}
                  alt="Women Category"
                  className="w-full h-full object-cover "
                />
              </div>
            
            </div>
          </FadeInSection>
        )}
  {menCategory.length > 0 && (
          <FadeInSection>
            <div className='flex justify-center bg-amber-100 p-4 cursor-pointer items-center  flex-col-reverse -rotate-6 hover:rotate-0 hover:transform transition-all duration-200 ease-in-out' onClick={()=> selectedCategory("men") }>
              <h1 className="text-xl text-center py-2">men</h1>

              <div className="category-card flex   max-w-[400px] max-h-[200px] min-w-0 overflow-hidden">
                <img
                  src={`${backendURL}/${menCategory[1].productImage[0].path.replace(/\\/g, "/")}`}
                  alt="Women Category"
                  className="w-full h-full object-cover "
                />
              </div>
            
            </div>
          </FadeInSection>
        )}
  


   
        
      </div>
    </div>
    </>
  )
}

export default Category
