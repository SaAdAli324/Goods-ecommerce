import React, { useContext, useEffect, useState } from 'react'

// icons 

import { FaFilter } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';

// swiper 

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import { useProduct } from './context/ProductContext';
import FadeInSection from './FadeAnimation/FadeInSection';

import { SearchContext } from './context/SearchBarContext';

// navigation for the product preview

import { useNavigate } from 'react-router-dom';
import { div, filter } from 'framer-motion/client';

import { useLoader } from './context/LoaderContext';
import Category from './category/Category';
import { useSearchParams } from 'react-router-dom';
// main component to display products
const Products = ({ onTop , related  }) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL
    // swiper state and other states

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState("")
    const [products, setProducts] = useState([])

    // context state


    // context hook
    const { setSelectedProduct, selectedProduct } = useProduct();
    const { query } = useContext(SearchContext)
    // navigation hook

    const navigate = useNavigate()

    // useEffect to fetch products based on category filter and modal state

    const { setLoading } = useLoader()
const [searchParams] = useSearchParams()
const category = searchParams.get('category'); // "women"
  console.log("Category from URL:", category);

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true)
                const res = await fetch(`${backendURL}/api/product/display${category||categoryFilter ? `?category=${categoryFilter||category}` : ""}`)
                const data = await res.json()

                setTimeout(() => setLoading(false), 1000);
                let filteredProducts = data.product
                if (query) {
                    filteredProducts = data.product.filter((p) =>
                        p.productName.toLowerCase().includes(query.toLowerCase())
                    )

                }

                setProducts(filteredProducts)

            } catch (err) {
                console.error("error while getting products", err);
            }
        }
        setThumbsSwiper(null)
        getProducts()
    }, [categoryFilter, query])



    const handleProductClick = (product) => {
        setSelectedProduct(product)
        setTimeout(() => {
            navigate(`/productsPreview?_id=${product._id}`)

        }, 5);
    }
    return (
        <>
        <div className='mx-auto  bg-white px- max-sm:px-2 max-md:px-10  space-y-4 py-4 mt-5'>
            <h1 className=' px-4 font-medium text-primary text-5xl uppercase max-sm:text-3xl '>{related? related :"NEW AND TRENDING"}
                
                {categoryFilter?  " for" + " "+ categoryFilter +"!" : ""} </h1>
          <p className='px-4 text-start'>we are offering best quality at lowest efforts and <br /> prices!...shop now to get extra discount</p>

            <div className=' px-4 mx-auto font-medium flex items-center gap-1.5 text-lg'>
                <label htmlFor="Filter" className='text-primary'>filter</label>

                <FaFilter className='text-primary text-sm' />
                <select
                    onChange={(e) => setCategoryFilter(e.target.value)}

                    name="Filter"
                    id="Filter"
                    className=' border-neutral p-1 rounded'

                >
                    <option value="">none</option>
                    <option value="women">women</option>
                    <option value="men">men</option>
                    <option value="kids">kids</option>
                </select>

            </div>
                

            <div className=' mx-auto px-4 max-sm:px-2 max-lg:grid-cols-2 max-xl:grid-cols-3 max-sm:grid-cols-1 max-sm:min-h-0 border-neutral grid grid-cols-5 gap-2 h-fit py-4'>
                {products && products.map(m => {
                    return (
                        <>
                        <div
                            key={m._id}
                            id='card'
                            onClick={(e) => (e.stopPropagation(), handleProductClick(m), onTop)}
                            className='flex  flex-col cursor-pointer pb-4   overflow-hidden  hover:shadow-lg transition-all duration-150'
                        >
                            <FadeInSection>
                                <div className='h-fit space-y-2'>
                                    <img
                                        className='w-full h-[600px] object-cover object-top rounded-t'
                                        src={`${backendURL}/${m.productImage[0].path.replace(/\\/g, "/")}`}
                                        alt="no image available"
                                    />
                                </div>
                            </FadeInSection>

                            <div className='px-4 flex flex-col pt-4 space-y-2'>
                                <FadeInSection>
                                    <h2 className='font-medium uppercase text-primary'>{m.productName.length > 20 ? m.productName.slice(0, 20) + "..." : m.productName}</h2>
                                    <p className='font-medium text-sm text-gray-500 max'>{m.productDescription.length > 50 ? m.productDescription.slice(0, 50) + "..." : m.productDescription}</p>
                                    <p className='text-accent font-bold'>RS.{m.price}</p>
                                </FadeInSection>
                            </div>
                        </div>
                     
                        </>
                    )
                })}
            </div>
        </div >

</>
    )
}

export default Products
