import React, { useState } from 'react'
import FadeInSection from '../FadeAnimation/FadeInSection'
import { Navigate, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const ReleatedProducts = ({ relProducts }) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()

    const [products, setProducts] = useState([relProducts])

    const handleProductClick = (product) => {
        console.log(product._id);

        navigate(`/productsPreview?_id=${product._id}`)
    }
    console.log(relProducts, "no prodcuts");

    if (!relProducts || relProducts.length === 0) {
        return <><p>blah blah</p></>
    }
    return (
        <div>
            <div className='py-14 mt-2 '>
                <div className='container mx-auto text-center'>
                    <h2 className='text-2xl font-medium text-primary'>Related Products</h2>
                </div>
                <div className=' mx-auto px-4 max-sm:px-2 max-lg:grid-cols-2 max-xl:grid-cols-3 max-sm:grid-cols-1 max-sm:min-h-0 border-neutral grid grid-cols-5 gap-2 h-fit py-4'>
                    {relProducts && relProducts.map(m => {
                        return (
                            <>
                                <Link to={`/productsPreview?_id=${m._id}`}>
                                    <div

                                        key={m._id}
                                        id='card'

                                        className='flex  flex-col cursor-pointer pb-4   overflow-hidden  hover:shadow-lg transition-all duration-150'

                                    >
                                        <FadeInSection>
                                            <div className='h-fit space-y-2'>
                                                <img
                                                    className='w-full h-[400px] object-cover object-top rounded-t'
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
                                </Link>
                            </>
                        )
                    })}
                </div>
            </div >
        </div>
    )
}

export default ReleatedProducts
