// TopProducts.jsx
import React from 'react';
import { Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';

const TopProducts = ({ data }) => {
    // ⚠️ IMPORTANT: Change this to match your backend URL

    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [topProducts, setTopProducts] = useState([])
    useEffect(() => {
        const fetchTopProcuts = async () => {
            try {
                const res = await fetch(`${backendURL}/api/admin/topSelling`)
                const data = await res.json()
                console.log(data);

                setTopProducts(data)
            } catch (error) {
                console.error(error);

            }
        }
        fetchTopProcuts()
    }, [])

    return (
        <div className=" p-6 rounded-lg shadow-lg h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold ">Top Selling Products</h3>
                <Trophy className="text-yellow-500" size={24} />
            </div>

            <div className="space-y-4">
                {topProducts.length === 0 ? (
                    <p className="text-gray-400">No sales data yet.</p>
                ) : (
                    topProducts.map((product, index) => (
                        <div key={product._id} className="flex items-center justify-between p-3 bg-gray-600 rounded-lg hover:bg-slate-500 transition">

                            <div className="flex items-center gap-4">
                                {/* Rank Badge */}
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold
                  ${index === 0 ? 'bg-yellow-500/20 text-yellow-500' :
                                        index === 1 ? 'bg-gray-400/20 text-gray-400' :
                                            index === 2 ? 'bg-orange-500/20 text-orange-500' : 'bg-gray-600/20 text-gray-500'}
                `}>
                                    #{index + 1}
                                </div>

                                {/* Product Image & Name */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded bg-gray-600 overflow-hidden">
                                        <img
                                            // Fix the path here:
                                            src={product.image ? ` ${backendURL}/${product.image.replace(/\\/g, "/")}` : ``}
                                            alt={product.name.length>50? product.name.slice(0,40): product.name}
                                            className="w-full h-full object-cover"
                                        // Fallback if image breaks
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-white text-sm">{product.name.length>40 ? product.name.slice(0,40)+"..." : product.name}</h4>
                                        <p className="text-xs text-gray-400">{product.totalSold} sold</p>
                                    </div>
                                </div>
                            </div>

                            <div className="text-right">
                                <span className="font-bold text-green-400 text-sm">${product.totalRevenue.toLocaleString()}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TopProducts;