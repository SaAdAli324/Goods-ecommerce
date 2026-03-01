
import { useState, useEffect } from 'react'

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { useNavigate } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import { useForm } from 'react-hook-form'

import FadeInSection from '../FadeAnimation/FadeInSection';

import Login from '../Auth/Login';
const Cart = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL
  const [cartItem, setCartItem] = useState([])

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { setSelectedProduct, selectedProduct } = useProduct();
  const token = localStorage.getItem("token")
  const [selectProductForCheckOut, setSelectProductForCheckOut] = useState([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate()

  useEffect(() => {
    const userCart = async () => {
      try {
        const res = await fetch(`${backendURL}/api/cart/getItems`,{
          headers:{
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        })
        const result = await res.json()
        console.log(result.cart.items , "cart item result");
        setCartItem(result.cart.items)
      } catch (err) {
        console.error("error while loading cart", err)
        return <p>something went wrong , login or wait</p>
      }
    }
    userCart()
    setTimeout(() => {
      const next = document.querySelectorAll('.swiper-button-next');
      const prev = document.querySelectorAll('.swiper-button-prev');
      next.forEach(btn => btn.addEventListener('click', e => e.stopPropagation()));
      prev.forEach(btn => btn.addEventListener('click', e => e.stopPropagation()));
    }, 500);
  }, [])

  console.log("this is the quantity", cartItem);



  if (!cartItem) {
    return alert("nothing in the cart")
  }

  const removeCartItem = async (_id) => {
    try {
      console.log("this is the product _id" , _id);
      
      console.log("token:", token);

      const request = await fetch(`${backendURL}/api/cart/remove/${_id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const response = await request.json()
      console.log(response);

      if (response.success) {
        setCartItem(prev => prev.filter(item => item._id !== _id));
        return alert("item removed!")
      }
      alert("can't remove the item try again later!")
    } catch (err) {
      console.error("error while removing item", err);
      return <p>something went wrong , login or wait</p>

    }
  }

  console.log("this is teh selected product id ", selectProductForCheckOut);
  if (!cartItem || cartItem.length===0) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center text-primary ">
        <p>No item in cart yet!</p>
      </div>
    );
  }

  return (
    <>
    
        <div className='flex max-md:px-0 items-center flex-col  max-sm:flex-col space-y-8 h- py-4 px-6'>
          {cartItem && cartItem.map(m => (
            <div
              key={m._id}
              id='card'
              className={`w-full shadow-2xl min-w-0 max-lg: h-fit flex max-lg:flex-col cursor-pointer py-2 space-x-2 ${selectProductForCheckOut.includes(m._id) ? "bg-neutral/70" : "bg-secondary"}`}
            >

              <FadeInSection>
                <div className='max-w-xl  flex justify-center items-start h-full max-lg:mx-auto min-w-0'>
                  <img className='w-2xs' src={`${backendURL}/${m.productId.productImage[0].path.replace(/\\/g, "/")}`} alt="" />
                </div>
              </FadeInSection>

              <div className='min-w-0 px-4  max-sm:w-full max-sm:px-4 max-md:w-xl text-wrap flex flex-col pt-4 text-primary text-lg text-start items-start space-y-2'>
                <FadeInSection>
                  <h2 className='font-normal text-2xl max-sm:text-lg overflow-hidden'>{m.productName}</h2>
                  <p className='font-light  text-sm max-sm:text-[10px] break-all text-neutral max'>{m.productDescription}</p>
                  <p className='text-accent font-bold'> RS.{m.productId.price}</p>
                  {m.quantity? <p className='text-accent font-medium'>price by quantity: Rs.{m.productId.price*m.quantity}</p>:""}
                  <input
                    onChange={(e) => setQuantity(e.target.value || 1)}
                    type="number"
                    min="1"
                    defaultValue={`${m.quantity}`}
                    className='border-2 border-primary mt-1 rounded-md p-2 w-24 text-primary'
                  />
                </FadeInSection>



                <FadeInSection>
                  <div className='flex  space-x-2'>
                    <button
                      onClick={() => navigate(`/checkout?productId=${m._id}`)}
                      className='flex items-center justify-center border-0 w-fit px-12 py-4 bg-accent text-secondary text-[16px] cursor-pointer hover:bg-primary hover:text-accent transition-all duration-75 ease-in-out'
                    >
                      Check Out
                    </button>
                    <button
                      onClick={() => removeCartItem(m._id)}
                      className='flex items-center justify-center border-0 w-fit px-12 py-4 bg-accent text-secondary text-[16px] cursor-pointer hover:bg-primary hover:text-accent transition-all duration-75 ease-in-out'
                    >
                      Remove Item
                    </button>
                  </div>
                </FadeInSection>


                <div className='pr-15 px-4 mt-2 space-y-2'>
                  <ul className='text-[12px] max list-disc space-y-2 text-gray-400'>
                    <li> 100% Original Quality Guaranteed</li>
                    <li> 7-Day Easy Exchange Policy</li>
                    <li> Cash on Delivery Available</li>
                    <li className='text-sm text-gray-400'>Exchange Policy: We offer a 7-day checking warranty. If you receive a damaged or incorrect item, please contact us within 24 hours for an instant exchange. Note: Change of mind returns are not accepted for opened packages.</li>
                    <li> Shop with Confidence: Enjoy hassle-free returns within 30 days. If you're not 100% satisfied with the fit or quality, simply return it for a full refund or exchange. Free shipping on all orders over Rs. 5000.</li>
                  </ul>
                </div>
              </div>

            </div>
          ))}

        </div>
     

    </>
  )
}

export default Cart
