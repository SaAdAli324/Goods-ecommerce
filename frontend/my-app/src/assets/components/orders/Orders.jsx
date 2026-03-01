import React, { useEffect, useState } from 'react';
import FadeInSection from '../FadeAnimation/FadeInSection';

const Orders = () => {

  useEffect(() => {
    function checkAuth() {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
      }
    }
    checkAuth()
  }, []);

  const [userOrders, setUserOrders] = useState([]);
  const token = localStorage.getItem("token");
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const orderHandler = async () => {
      try {
        const response = await fetch(`${backendURL}/api/get/orders`, {
          method: "GET",
          headers: { "Authorization": `Bearer ${token}` }
        });
        const res = await response.json();
        console.log(res.ord);
        
        if (res.success) {
          setUserOrders(res.order);
        }

      } catch (error) {
        console.log("error while getting orders", error);
      }
    };
    orderHandler();
  }, []);

  const cancelOrder = async (orderId) => {
    try {
      const status = "Cancelled";
      const response = await fetch(`${backendURL}/api/update/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      });
      const res = await response.json();
      if (res.success) {
        return setUserOrders(res.order)
      }

    } catch (error) {
      console.error("error while canceling order", error);
    }
  };

  if (userOrders.length === 0) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center text-primary ">
        <p>No order placed yet!</p>
      </div>
    );
  }

  return (
    <div className=" mx-20 max-sm:mx-0 max-sm:text-sm py-8 space-y-6">

      {userOrders.map((order) => (
        <div
          key={order._id}
          className="border-primary rounded-lg shadow-md p-6 flex flex-col space-y-4 bg-secondary"
        >
          <div className="flex justify-between items-center">
            <FadeInSection>
              <p className="text-primary">
                Order ID: <span className="font-medium">{order._id}</span>
              </p>
              <p
                className={`font-semibold ${order.status === 'Pending'
                    ? 'text-accent'
                    : order.status === 'Processing'
                      ? 'text-blue-500'
                      : order.status === 'Shipped'
                        ? 'text-orange-400'
                        : order.status === 'Delivered'
                          ? 'text-green-500'
                          : 'text-red-500'
                  }`}
              >
                {order.status}
              </p>
            </FadeInSection>
          </div>

          <div className="space-y-2">
            {order.products.map((prod) => (
              <div
                key={prod.productId._id}
                className="flex justify-between items-center border-b border-neutral pb-2"
              >
                <div className="flex items-center space-x-4">
                  <FadeInSection>
                    <img
                      src={`${backendURL}/${prod.productId.productImage[0].path.replace(/\\/g, '/')}`}
                      alt={prod.productId.productName}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-primary">{prod.productId.productName}</p>
                      <p className="text-primary text-sm">Quantity: {prod.quantity}</p>
                      <p className="text-primary text-sm">Price: RS.{prod.priceAtPurchase}</p>
                    </div>
                  </FadeInSection>
                </div>
                <FadeInSection>
                  <p className="font-semibold text-primary">
                    Subtotal: RS.{prod.priceAtPurchase * prod.quantity}
                  </p>
                </FadeInSection>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <FadeInSection>
              <p className="font-bold text-lg text-primary">Total: RS.{order.totalAmount}</p>
            </FadeInSection>
          </div>
          <FadeInSection>
            <div className='flex'>
              <p className="text-neutral text-sm">
                Placed on: {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <button
                disabled={order.status === "Cancelled"}
                onClick={() => cancelOrder(order._id)}
                className='w-24 ml-auto cursor-pointer bg-accent text-secondary py-1.5 rounded hover:bg-primary hover:text-accent transition-all duration-75 ease-in-out'
              >
                Cancel
              </button>
            </div>
          </FadeInSection>
          
        </div>
        
      ))
      }
      
    </div >
  );
};

export default Orders;
