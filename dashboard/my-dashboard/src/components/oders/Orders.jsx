import React, { use } from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { FaSearch } from 'react-icons/fa'

const Orders = () => {
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [orders, setOrders] = useState([])
    const [filterdOrder, setFilterdOrder] = useState([])
    const token = localStorage.getItem("token")
    console.log(token);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(`${backendURL}/api/admin/get/orders`,{
                    headers:{
                        "Authorization":`Bearer ${token}`
                    }
                })
                const data = await res.json()
                console.log(data.order);
                setOrders(data.order)
                setFilterdOrder(data.order)

            } catch (error) {
                console.log("error while fetching orders", error);
            }
        }
        fetchOrders()
    },[])

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'Shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Delivered': return 'bg-green-100 text-green-700 border-green-200';
            case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const statusFilter = async (value, search) => {
        try {

            if (value === "all" || search === "") {
                return setFilterdOrder(orders)
            }
            if (search) {
                const query = search.toLowerCase();

                const filterBySearch = orders.filter(f => {

                    return f.user?.name?.toLowerCase().includes(query);
                });

                setFilterdOrder(filterBySearch);
                return;
            }
            const filterdArray = orders.filter(f => f.status === value)
            console.log("filterd array", filterdArray);
            setFilterdOrder(filterdArray)
        } catch (error) {
            console.log(error);
        }


    }
  const updateOrder = async (status,orderId) => {
    try {
      const response = await fetch(`${backendURL}/api/update/orders/admin/${orderId}`, {
        method: "PUT",
        headers: {
          "Authorization":`Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      });
      const res = await response.json();

         setFilterdOrder(res.order)
         alert(res.message)
         

    } catch (error) {
      console.error("error while canceling order", error);
    }
  };
  if (!filterdOrder || filterdOrder?.length===0) {
    return <div className='flex items-center justify-center my-auto text-lg text-slate-500'><p>no orders to show</p></div>
  }
    return (
        <div className=' pl-36 px-16 space-y-4 max-md:space-y-16 overflow-scroll h-fit max-md:p-2'>
            <div className=' max-md:flex-col max-md:gap-2 mx-auto flex justify-between  h-fit'>
                <div className='my-auto  max-sm:text-center '>
                    <h2 className='text-3xl font-semibold '>Order's</h2>
                    <p className='text-slate-500'>Manage all the orders from here</p>
                </div>
                <div className=' flex  max-md:flex-col items-end gap-4'>
                    <div className='flex  max-sm:w-full items-center max-md:justify-end '>
                        <FaSearch className=' font-medium text-xl relative left-9' />
                        <input className='border text-end px-4 py-2 rounded-3xl' onInput={(e) => statusFilter(null, e.target.value)} placeholder='search' type="search" name="" id="" />
                    </div>
                    <div className=' flex max-sm: items-center gap-2'>
                        <span className='text-slate-500'>Fiter by status:</span>
                        <select onChange={(e) => statusFilter(e.target.value)
                        } className='border px-3 py-1 rounded-full' name="" id="">
                            <option value="all">All</option>
                            <option value="Pending">Pending</option>
                            <option value="Proccessing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className=' overflow-y-scroll'>
                <table className='  shadow-lg shadow-slate-400  w-full max-w-full min-w-full divide-y text-start divide-slate-100 border-collapse'>
                    <thead className=''>
                        <tr className='bg-slate-100 h-12  '>
                            <td className='px-4 py-2 font-medium'>Order ID</td>
                            <td className='px-4 py-2 font-medium'>Customer Info</td>
                            <td className='px-4 py-2 font-medium'>Total Amount</td>
                            <td className='px-4 py-2 font-medium'>Quantity</td>
                            <td className='px-4 py-2 font-medium'>Address</td>
                            <td className='px-4 py-2 font-medium'>Date</td>
                            <td className='px-4 py-2 font-medium'>Status</td>
                        </tr>
                    </thead>
                    <tbody>
                        { filterdOrder.map((order) => {
                            return (
                                <tr className='h-12 max-w-fit min-w-0  cursor-pointer col-span-3 hover:bg-slate-100 transition-all ease-in-out duration-150'>

                                    <td className='p-4 '>{order._id}</td>
                                    <td className='p-4 '><div>{order.user.name}</div>
                                        <div className='text-sm text-slate-500'>{order.user.email}</div>
                                        <div className='text-sm text-slate-500'>{order.user.phone}</div>
                                    </td>
                                    <td className='p-4 '>{order.totalAmount}</td>
                                    <td className='p-4 '>{order.products.map((product) => product.quantity)}</td>

                                    <td className='p-4 '>{order.user.address}</td>
                                    <td className='p-4 '>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className={`p-4 `}>
                                        <span className={`px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(order.status)}`}>
                                            <select  onChange={(e) => updateOrder(e.target.value,order._id)
                                            } className='outline-0 cursor-pointer' name="" id="">
                                               
                                                <option value="Pending">Pending</option>
                                                <option value="Proccessing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Orders
