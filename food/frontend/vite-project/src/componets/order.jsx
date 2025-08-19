import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
import Footer from './Footer'

export const Order = () => {
  const [order, setorder] = useState([]); // ✅ array not string
  const [loading, setLoading] = useState(false);

  const orderSchema = async () => {
  try {
    setLoading(true);
    const res = await axios.get("http://localhost:5001/api/order", { withCredentials: true });
    
    // console.log("API response:", res.data);

    // ✅ Adjust depending on API shape
    if (Array.isArray(res.data)) {
      setorder(res.data);
    } else if (res.data.orders) {
      setorder(res.data.orders);
    } else {
      setorder([res.data]);
    }

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    orderSchema();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mb-2 md:mb-3 lg:mb-3 w-[95%] mx-auto">
        {loading && <p className="text-3xl font-bold">Loading...</p>}

        {!loading && order.length === 0 ? (
          <p className="text-xl font-semibold">No orders found</p>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-800 my-2">Your Orders</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.isArray(order) && order.map((orderItem, orderIndex) => (
                <div
                  key={orderIndex}
                  className="overflow-hidden px-2 md:my-3 lg:my-3 my-1 border-2 rounded-lg shadow-sm"
                >
                  {/* Order Info */}
                  <div className="p-2 border-b flex justify-between">
                    <p className="font-bold text-lg">Order #{orderItem._id}</p>
                    <p className="text-gray-600 font-bold">Total: ₹{orderItem.totalAmount}</p>
                  </div>

                  {/* Items in the order */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-2">
                    {orderItem.items.map((data, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex flex-col items-center border rounded-lg p-2"
                      >
                        <img
                          src={data.productId?.image?.[0]}
                          alt={data.productId?.name || "Product"}
                          className="w-24 h-24 object-fill rounded-md"
                        />
                        <p className="font-medium text-sm mt-2">
                          {data.productId?.name}
                        </p>
                        <p className="text-gray-600 text-sm">Qty: {data.quantity}</p>
                        <p className="font-semibold">₹{data.price}</p>
                      </div>
                    ))}
                  </div>
                 <p className="font-bold text-lg">Status: {orderItem.status}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};
