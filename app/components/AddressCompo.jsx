"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { 
  FiUser, 
  FiSmartphone, 
  FiMapPin, 
  FiHash, 
  FiFlag, 
  FiHome, 
  FiBriefcase, 
  FiMap,
  FiPhone, 
  FiTrash2,
  FiPlus
} from 'react-icons/fi';
import { MdOutlinePublic } from "react-icons/md";
import { HiCheckCircle } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { base_url } from './urls';
import { useRouter } from 'next/navigation';

// --- Helper Component for Icons ---
const getLabelIcon = (label) => {
  const l = label ? label.toLowerCase() : 'other';
  if (l === 'home') return <FiHome />;
  if (l === 'work' || l === 'office') return <FiBriefcase />;
  return <FiMapPin />;
};

const AddressCompo = ({ setCheckoutData }) => {
  const [allAddress, setAllAddress] = useState([]);
  const route = useRouter()
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialAddressState = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    label: "Home",
    isDefault: false
  };

  const [address, setAddress] = useState(initialAddressState);

  // --- Handlers ---

  const handleInput = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleLabel = (labelName) => {
    setAddress((prev) => ({ ...prev, label: labelName }));
  };

  const handleDefault = (e) => {
    setAddress((prev) => ({ ...prev, isDefault: e.target.checked }));
  };

  const fetchAddress = async () => {
    try {
      const response = await axios.get(`${base_url}/address/all`);
      const data = response.data;
      
      if (data.success) {
        setAllAddress(data.addresses);
        
        // If there are no addresses, force show the form
        if (data.addresses.length === 0) {
            setShowAddressForm(true);
        }

        // Set default address for checkout
        const defaultAddr = data.addresses.find((item) => item.isDefault);
        if (defaultAddr && setCheckoutData) {
          setCheckoutData((prev) => ({ ...prev, address: defaultAddr._id }));
        }
      }
    } catch (error) {
      console.log(error.status)
      if(error.status >400){
   route.push("/login")
      }
      console.error("Error fetching addresses", error);
      setAllAddress([]);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${base_url}/address/addnew`, address);
      const data = response.data;

      if (data.success) {
        toast.success(data.message);
        setAddress(initialAddressState); // Reset form
        await fetchAddress(); // Refresh list
        setShowAddressForm(false); // Go back to list view
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add address");
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (id) => {
    if(!window.confirm("Are you sure you want to delete this address?")) return;
    
    try {
      const response = await axios.delete(`${base_url}/address/delete/${id}`);
      const data = response.data;
      if (data.success) {
        toast.success(data.message);
        fetchAddress();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete");
    }
  };


  const handelDefaultAddress = async(id)=>{
    try {
      const response = await axios.put(`${base_url}/address/setdefault/${id}`);
      const data = await response.data;
      if(data.success){
        toast.success(data.message)
        fetchAddress()
      }
      
    } catch (error) {
              toast.error(error.response.data.message)

    }
  }

  useEffect(() => {
    fetchAddress();
  }, []);



  return (
    <div className="w-full  ">
      
      {(!showAddressForm && allAddress.length > 0) && (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Saved Addresses</h2>
            <button 
              onClick={() => setShowAddressForm(true)}
              className="flex items-center gap-2 text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <FiPlus size={18} /> Add New
            </button>
          </div>

          <div className="space-y-4">
            {allAddress.map((item) => (
              <div
                key={item._id}
                className={`relative flex flex-col md:flex-row justify-between items-start gap-4 p-5 rounded-xl border transition-all duration-200 
                  ${item.isDefault
                    ? 'border-blue-200 bg-blue-50/30 ring-1 ring-blue-100'
                    : 'border-gray-100 bg-gray-50 hover:border-gray-300 hover:shadow-md'
                  }`}
              >
                {/* Left: Details */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-gray-900 capitalize">
                      {item.firstName} {item.lastName}
                    </h3>
                    
                    <span className="flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-full uppercase tracking-wider">
                      {getLabelIcon(item.label)} {item.label}
                    </span>

                    {item.isDefault ? (
                      <span className="flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold text-rose-700 bg-rose-100 border border-blue-200 rounded-full">
                        <HiCheckCircle className="text-base" /> Default
                      </span>
                    ):
                  (
                      <span
                      onClick={()=>handelDefaultAddress(item._id)}
                      className="flex items-center gap-1 cursor-pointer px-2.5 py-0.5 text-xs font-semibold text-blue-700 bg-blue-100 border border-blue-200 rounded-full">
                        <HiCheckCircle className="text-base" /> Set Default
                      </span>
                    )
                  
                  }
                  </div>

                  <div className="text-sm text-gray-600 leading-relaxed pl-1">
                    <p>{item.street1}{item.street2 && `, ${item.street2}`}</p>
                    <p className="capitalize">
                      {item.city}, {item.state} - <span className="font-medium text-gray-800">{item.zipCode}</span>
                    </p>
                    <p className="uppercase text-xs text-gray-400 font-semibold tracking-wide mt-1">
                      {item.country}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-700 font-medium pt-1 pl-1">
                    <FiPhone className="text-gray-400" />
                    <span>{item.phoneNumber}</span>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-row md:flex-col gap-2 shrink-0 w-full md:w-auto mt-2 md:mt-0 pt-3 md:pt-0 border-t md:border-t-0 border-gray-200 md:border-l md:pl-4">
                  <button
                    onClick={() => deleteAddress(item._id)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-500 bg-white border border-red-100 rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors"
                  >
                    <FiTrash2 size={16} /> <span className="md:hidden">Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: Add/Edit Form */}
      {(showAddressForm || allAddress.length === 0) && (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {allAddress.length === 0 ? "Add Shipping Address" : "New Address"}
          </h2>

          <form onSubmit={handleAddAddress} className="space-y-6">
            
            {/* Contact Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Contact Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* First Name */}
                <div className="relative">
                  <FiUser className="absolute top-3.5 left-3.5 text-gray-400 text-lg" />
                  <input
                    required
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={address.firstName}
                    onChange={handleInput}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>

                {/* Last Name */}
                <div className="relative">
                  <FiUser className="absolute top-3.5 left-3.5 text-gray-400 text-lg" />
                  <input
                    required
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={address.lastName}
                    onChange={handleInput}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>

                {/* Phone */}
                <div className="relative md:col-span-2">
                  <FiSmartphone className="absolute top-3.5 left-3.5 text-gray-400 text-lg" />
                  <input
                    required
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={address.phoneNumber}
                    onChange={handleInput}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Address Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Address Info</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Street 1 */}
                <div className="relative md:col-span-2">
                  <FiMapPin className="absolute top-3.5 left-3.5 text-gray-400 text-lg" />
                  <input
                    required
                    type="text"
                    name="street1"
                    placeholder="Street Address, P.O. Box"
                    value={address.street1}
                    onChange={handleInput}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>

                {/* Street 2 */}
                <div className="relative md:col-span-2">
                  <input
                    type="text"
                    name="street2"
                    placeholder="Apartment, Suite, Unit, etc. (Optional)"
                    value={address.street2}
                    onChange={handleInput}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>

                {/* City */}
                <div className="relative">
                  <MdOutlinePublic className="absolute top-3.5 left-3.5 text-gray-400 text-lg" />
                  <input
                    required
                    type="text"
                    name="city"
                    placeholder="City"
                    value={address.city}
                    onChange={handleInput}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>

                {/* State */}
                <div className="relative">
                  <FiMap className="absolute top-3.5 left-3.5 text-gray-400 text-lg" />
                  <input
                    required
                    type="text"
                    name="state"
                    placeholder="State / Province"
                    value={address.state}
                    onChange={handleInput}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>

                {/* Zip */}
                <div className="relative">
                  <FiHash className="absolute top-3.5 left-3.5 text-gray-400 text-lg" />
                  <input
                    required
                    type="text"
                    name="zipCode"
                    placeholder="Zip / Postal Code"
                    value={address.zipCode}
                    onChange={handleInput}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>

                {/* Country */}
                <div className="relative">
                  <FiFlag className="absolute top-3.5 left-3.5 text-gray-400 text-lg" />
                  <input
                    required
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={address.country}
                    disabled
                    onChange={handleInput}
                    className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="pt-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Settings</h3>
              
              <div className="flex flex-col gap-4">
                {/* Type Selection */}
                <div className="flex flex-wrap gap-3">
                  {['Home', 'Work', 'Other'].map((item, index) => {
                    const isActive = address.label === item;
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleLabel(item)}
                        className={`
                          flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-200
                          ${isActive
                            ? 'bg-gray-800 text-white border-gray-800 shadow-md transform scale-105'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                          }
                        `}
                      >
                        {item === 'Home' && <FiHome />}
                        {item === 'Work' && <FiBriefcase />}
                        {item === 'Other' && <FiMapPin />}
                        {item}
                      </button>
                    );
                  })}
                </div>

                {/* Default Checkbox */}
                <label className="flex items-center gap-3 cursor-pointer group w-fit">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={address.isDefault}
                      onChange={handleDefault}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 shadow-sm transition-all checked:border-blue-600 checked:bg-blue-600 hover:border-blue-400"
                    />
                    <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white" viewBox="0 0 14 10" fill="none">
                      <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    Make this my default address
                  </span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save Address'}
              </button>

              {allAddress.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowAddressForm(false)}
                  className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-semibold text-lg transition-all"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddressCompo;