"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { base_url, img_url } from "../components/urls";
import { 
  FiPackage, 
  FiMapPin, 
  FiCreditCard, 
  FiClock, 
  FiCheckCircle 
} from "react-icons/fi";

const OrderCompo = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${base_url}/order/get`);
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // Helper for status badge colors
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
      case "paid":
        return "bg-green-100 text-green-700 border-green-200";
      case "processing":
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <FiPackage className="text-blue-600" />
        Order History
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
            >
              {/* Order Header */}
              <div className="bg-gray-50 border-b border-gray-200 p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Order ID: <span className="font-mono text-gray-700">{order._id}</span>
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <FiClock />
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 uppercase tracking-wider ${getStatusColor(
                      order.paymentStatus
                    )}`}
                  >
                    <FiCreditCard /> {order.paymentStatus}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 uppercase tracking-wider ${getStatusColor(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus === "confirmed" ? <FiCheckCircle /> : <FiClock />}
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              {/* Order Body */}
              <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Items List */}
                <div className="md:col-span-2 space-y-4">
                  <h3 className="font-semibold text-gray-800 border-b pb-2">Items</h3>
                  {order.orderItems.map((item) => (
                    <div key={item._id} className="flex gap-4 items-center bg-gray-50 p-3 rounded-lg">
                      <div className="h-16 w-16 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={`${img_url}/${item.image}`} // Adjust image path logic as needed
                          alt="Product"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/150?text=No+Image";
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">
                          Product ID: {item.product.slice(-6)}
                        </p>
                        <p className="text-xs text-gray-500 uppercase mt-1">Size: {item.size}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-800">₹{item.price}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary & Address */}
                <div className="space-y-6">
                  {
                    console.log(order,"sss")
                  }
                  <div>
                    <h3 className="font-semibold text-gray-800 border-b pb-2 mb-3 flex items-center gap-2">
                      <FiMapPin className="text-gray-500" /> Shipping
                    </h3>
                    <div className="text-sm text-gray-600 space-y-1 bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium text-gray-800">
                        {order.address?.firstName} {order.address?.lastName}
                      </p>
                      <p>{order.address?.street1}, {order.address.street2}</p>
                      <p>
                        {order.address.city}, {order.address.state} {order.address.zipCode}
                      </p>
                      <p>{order.address.country}</p>
                      <p className="pt-2 text-gray-800">Ph: {order.address.phoneNumber}</p>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-3">Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>₹{order.itemsPrice}</span>
                      </div>
                      {order.discountPrice > 0 && (
                        <div className="flex justify-between text-red-500">
                          <span>Discount</span>
                          <span>-₹{order.discountPrice}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-gray-800 text-lg border-t border-blue-200 pt-2 mt-2">
                        <span>Total</span>
                        <span>₹{order.totalPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderCompo;