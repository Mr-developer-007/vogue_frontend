"use client"
import { base_url } from '@/app/components/urls'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FiUser, FiMail, FiShield, FiMapPin, FiShoppingBag, FiCalendar, FiPackage, FiCheckCircle, FiClock } from 'react-icons/fi'

const UserCompo = ({ id }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${base_url}/user/admin/user/${id}`);
            // Accessing the nested data object based on your JSON structure
            setUserData(response.data.data);
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, [id]) // Added 'id' to dependency array

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!userData || !userData.user) {
        return <div className="text-center p-8 text-gray-500">User data not found.</div>;
    }

    const { user, addresses, orders } = userData;

    
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered': return 'bg-green-100 text-green-700';
            case 'shipped': return 'bg-blue-100 text-blue-700';
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6 font-sans">
            {/* Header / Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="h-24 w-24 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 border-4 border-blue-100">
                        <FiUser size={40} />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-2xl font-bold text-gray-900 capitalize flex items-center justify-center md:justify-start gap-2">
                            {user.name}
                            {user.status && <FiCheckCircle className="text-green-500" size={20} title="Active Account" />}
                        </h1>
                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600 justify-center md:justify-start">
                            <span className="flex items-center gap-1.5"><FiMail /> {user.email}</span>
                            <span className="flex items-center gap-1.5 capitalize"><FiShield /> {user.role}</span>
                            <span className="flex items-center gap-1.5"><FiCalendar /> Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 text-center md:text-right bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">Total Orders</div>
                        <div className="text-2xl font-bold text-gray-900">{orders?.length || 0}</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Saved Addresses Section */}
                <div className="lg:col-span-1 space-y-4">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <FiMapPin /> Saved Addresses
                    </h2>
                    {addresses?.length > 0 ? (
                        <div className="space-y-3">
                            {addresses.map((address) => (
                                <div key={address._id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                                    {address.isDefault && (
                                        <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                                            DEFAULT
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-md border border-gray-200">
                                            {address.label}
                                        </span>
                                        <span className="text-sm font-semibold capitalize text-gray-800">
                                            {address.firstName} {address.lastName}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">{address.street1} {address.street2}</p>
                                    <p className="text-sm text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
                                    <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                                        <FiUser size={12} /> {address.phoneNumber}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 bg-white p-4 rounded-xl border border-gray-200">No addresses saved.</p>
                    )}
                </div>

                {/* Order History Section */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <FiShoppingBag /> Order History
                    </h2>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        {orders?.length > 0 ? (
                            <div className="divide-y divide-gray-100">
                                {orders.map((order) => (
                                    <div key={order._id} className="p-5 hover:bg-gray-50 transition-colors">
                                        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                            <div>
                                                <div className="text-sm font-semibold text-gray-900">
                                                    Order <span className="text-blue-600 font-mono">#{order._id.slice(-6).toUpperCase()}</span>
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                                    <FiClock size={12}/> {new Date(order.createdAt).toLocaleString()}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${getStatusColor(order.orderStatus)}`}>
                                                    {order.orderStatus}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* Order Items Preview */}
                                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                            <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider flex items-center gap-1">
                                                <FiPackage size={12}/> Items ({order.orderItems.length})
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                {order.orderItems.map((item, idx) => (
                                                    <div key={idx} className="flex justify-between items-center text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-gray-800">{item.product.title}</span>
                                                            <span className="text-xs text-gray-500 bg-gray-200 px-1.5 rounded">Size: {item.size?.toUpperCase()}</span>
                                                        </div>
                                                        <div className="text-gray-600 text-xs">
                                                            {item.quantity} x ₹{item.price}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-4 flex justify-between items-center pt-3 border-t border-dashed border-gray-200">
                                            <div className="text-sm text-gray-500">
                                                Payment: <span className={`font-medium capitalize ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-500'}`}>{order.paymentStatus}</span>
                                            </div>
                                            <div className="font-bold text-gray-900">
                                                Total: ₹{order.totalPrice}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center text-gray-500">
                                <FiShoppingBag className="mx-auto mb-2 text-gray-300" size={32} />
                                <p>No orders placed yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCompo