import React, { useEffect, useState } from 'react'

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { IoCartOutline } from "react-icons/io5";

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Products from '../Products';
// context hook
import { useProduct } from '../context/ProductContext';

import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ImageSlider from '../imageSlider/ImageSlider';
// main component to preview a single product
import FadeInSection from '../FadeAnimation/FadeInSection';
import ReleatedProducts from '../releatedProducts/ReleatedProducts';
import { useLoader } from '../context/LoaderContext';
const ProductPreview = ({ product }) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [clickedProducts , setClickedProdcuts] = useState("")
    const [previewProduct, setPreviewProduct] = useState(null)
    const [products, setProducts] = useState([])
    const [quantity, setQuantity] = useState(1)
    const {setLoading}=useLoader()

    
    const [searchParams] = useSearchParams()
    const product_id = searchParams.get("_id")
    console.log( "product id",product_id);
    


    const navigate = useNavigate()
    useEffect(() => {
        const productForPreview = async () => {
            try {
                setLoading(true)
                const res = await fetch(`${backendURL}/api/product/display?_id=${clickedProducts? clickedProducts : product_id}`)
                const data = await res.json()
                const products = data.selectedProduct
               setPreviewProduct(products)
               setProducts(data.relatedProducts)
               window.scrollTo(0,0)
              setTimeout(() => setLoading(false), 1000);

            } catch (err) {
                console.error("error while getting products in the product preview", err);
            }
        }
        productForPreview()
    }, [product_id])

    if (!previewProduct) {
        return (
            <div className="w-full h-[80vh] flex flex-col justify-center items-center text-neutral">
                <p>No product selected.</p>
                <p className="text-sm text-gray-400">Try selecting one from the products page.</p>
            </div>
        );
    }
    if (!previewProduct || previewProduct.length===0) {
        return (
            <div className="w-full h-[80vh] flex flex-col justify-center items-center text-neutral">
                <p>Loading product details...</p>
            </div>
        );
    }
    
    
    const addTOCart = async () => {
        try {
            const token = localStorage.getItem("token")
         console.log(typeof quantity , "this is the type of quantity");
         
            

            const res = await fetch(`${backendURL}/api/cart/add/${previewProduct._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ quantity })
            })

            const serverResponse = await res.json()
           
            if (serverResponse.success) {
                localStorage.setItem("cartItem", JSON.stringify(serverResponse.cartItem))
                alert("item added to the cart!")
            }

        } catch (err) {
            console.log("error while adding to cart", err);
        }
    }
      


    return (
        <>
            <div className='container mx-auto  bg-neutral max-sm:mx-auto py- space-y-4 pr-4 z-50'>
                <div className='max-sm:grid-cols-1 max-sm:gap-4 grid grid-cols-2  gap-8 h-fit'>

                    <div className='flex flex-col cursor-pointer py-2'>
                        <div className='space-y-2'>
                            <ImageSlider custom={"!h-[500px]"} images={previewProduct.productImage} backendURL={backendURL} />
                        </div>
                    </div>

                    <div className='px-4 flex max-sm:mx-auto text-2xl flex-col pt-4 space-y-8'>
                        <h2 className='font-medium uppercase text-primary'>{previewProduct.productName}</h2>
                        <p className='text-[16px] text-neutral max'>'{previewProduct.productDescription}'</p>
                        <p className='text-accent font-bold'>RS.{previewProduct.price}</p>

                        <input
                            onChange={(e) => setQuantity(e.target.value || 1)}
                            type="number"
                            min="1"
                            max={previewProduct.stock}
                            defaultValue={"1"}
                            className='border-2 border-primary rounded-md p-2 w-24 text-primary'
                           
                        />
                        {/* {alreadyInCart ? ( */}
                            {/* <div>
                                <button
                                    onClick={() => navigate("/cart")}
                                    className='flex items-center justify-center border-0 w-fit px-16 py-4 bg-accent text-secondary text-[16px] cursor-pointer hover:bg-primary hover:text-accent transition-all duration-75 ease-in-out'
                                >
                                    Check out <IoCartOutline className='text-lg' />
                                </button>
                                <p className='text-sm text-neutral underline'>Item already in cart!</p>
                            </div> */}
                        {/* ) : ( */}
                            <button
                                onClick={() => localStorage.getItem("token") ? addTOCart() : navigate("/login")}
                                className='flex items-center justify-center border-0 w-fit px-16 py-4 bg-accent text-secondary text-[16px] cursor-pointer hover:bg-primary hover:text-accent transition-all duration-75 ease-in-out'
                            >
                                Add to cart <IoCartOutline className='text-lg' />
                            </button>
                        
                        {/* )} */}
                        <div className='pr-15 space-y-2'>
                            <ul className='text-sm list-disc space-y-2 text-gray-400'>
                                <li> 100% Original Quality Guaranteed</li>
                                <li> 7-Day Easy Exchange Policy</li>
                                <li> Cash on Delivery Available</li>
                            <li className='text-sm text-gray-400'>Exchange Policy: We offer a 7-day checking warranty. If you receive a damaged or incorrect item, please contact us within 24 hours for an instant exchange. Note: Change of mind returns are not accepted for opened packages.</li>
                            <li> Shop with Confidence: Enjoy hassle-free returns within 30 days. If you're not 100% satisfied with the fit or quality, simply return it for a full refund or exchange. Free shipping on all orders over Rs. 5000.</li>
                            </ul>
                            </div>
                    </div>
                </div>
            </div>
            {products.length===0 ? "no products to show" : <ReleatedProducts relProducts={products}/>}
            

           
        </>
    )
}

export default ProductPreview
