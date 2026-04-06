"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { 
  FiHome, 
  FiBriefcase, 
  FiMapPin,
  FiTrash2,
  FiPlus,
  FiCheck
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { base_url } from './urls';
import { useRouter } from 'next/navigation';

// --- Helper Component for Icons ---
const getLabelIcon = (label) => {
  const l = label ? label.toLowerCase() : 'other';
  if (l === 'home') return <FiHome size={14} />;
  if (l === 'work' || l === 'office') return <FiBriefcase size={14} />;
  return <FiMapPin size={14} />;
};

const AddressCompo = ({ setCheckoutData }) => {
  const [allAddress, setAllAddress] = useState([]);
  const route = useRouter();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

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
    setFetching(true);
    try {
      const response = await axios.get(`${base_url}/address/all`);
      const data = response.data;
      
      if (data.success) {
        setAllAddress(data.addresses);
        
        if (data.addresses.length === 0) {
            setShowAddressForm(true);
        }

        const defaultAddr = data.addresses.find((item) => item.isDefault);
        if (defaultAddr && setCheckoutData) {
          setCheckoutData((prev) => ({ ...prev, address: defaultAddr._id }));
        }
      }
    } catch (error) {
      if(error.status > 400){
         route.push("/login");
      }
      console.error("Error fetching addresses", error);
      setAllAddress([]);
    } finally {
      setFetching(false);
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
        setAddress(initialAddressState);
        await fetchAddress();
        setShowAddressForm(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add address");
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (id) => {
    if(!window.confirm("Are you sure you want to remove this address?")) return;
    
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
        toast.success(data.message);
        fetchAddress();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update default address");
    }
  }

  useEffect(() => {
    fetchAddress();
  }, []);

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-10 h-10 border-2 border-gray-200 border-t-[#B5945C] rounded-full animate-spin"></div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Loading details...</p>
      </div>
    );
  }

  return (
    <div className="w-full text-gray-900" style={{ '--primary': '#B5945C' }}>
      
      {/* --- VIEW 1: SAVED ADDRESSES --- */}
      {(!showAddressForm && allAddress.length > 0) && (
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-gray-100">
          <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-6">
            <div>
              <h2 className="text-3xl font-serif font-light tracking-tight text-gray-900">Saved Addresses</h2>
              <p className="text-sm text-gray-400 font-light mt-2">Manage where your pieces are delivered.</p>
            </div>
            <button 
              onClick={() => setShowAddressForm(true)}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-900 hover:text-[var(--primary)] transition-colors pb-1"
            >
              <FiPlus size={16} /> New Address
            </button>
          </div>

          <div className="grid grid-cols-1  gap-6">
            {allAddress.map((item) => (
              <div
                key={item._id}
                className={`relative flex flex-col p-6 rounded-2xl transition-all duration-300 border h-full
                  ${item.isDefault
                    ? 'border-[var(--primary)] shadow-[0_8px_30px_rgb(181,148,92,0.08)] bg-white'
                    : 'border-gray-100 bg-[#FCFBFA] hover:border-gray-300 hover:shadow-sm'
                  }`}
              >
                {/* Default Badge */}
                {item.isDefault && (
                  <div className="absolute -top-3 left-6 bg-[var(--primary)] text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <FiCheck size={10} /> Default
                  </div>
                )}

                <div className="flex justify-between items-start mb-4 mt-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-medium text-gray-900 capitalize tracking-wide">
                      {item.firstName} {item.lastName}
                    </h3>
                  </div>
                  <span className="flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold text-gray-400 bg-white border border-gray-200 rounded-full uppercase tracking-widest shadow-sm">
                    {getLabelIcon(item.label)} {item.label}
                  </span>
                </div>

                <div className="text-sm text-gray-500 font-light leading-relaxed flex-grow">
                  <p>{item.street1}</p>
                  {item.street2 && <p>{item.street2}</p>}
                  <p className="capitalize">
                    {item.city}, {item.state} <span className="font-medium text-gray-900 ml-1">{item.zipCode}</span>
                  </p>
                  <p className="uppercase text-[11px] text-gray-400 font-semibold tracking-widest mt-2">
                    {item.country}
                  </p>
                  <p className="text-gray-900 font-medium mt-4 tracking-wide">
                    {item.phoneNumber}
                  </p>
                </div>

                <div className="flex items-center gap-6 mt-6 pt-5 border-t border-gray-100">
                  {!item.isDefault && (
                    <button
                      onClick={() => handelDefaultAddress(item._id)}
                      className="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-[var(--primary)] transition-colors"
                    >
                      Make Default
                    </button>
                  )}
                  <button
                    onClick={() => deleteAddress(item._id)}
                    className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors ml-auto"
                  >
                    <FiTrash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- VIEW 2: ADD/EDIT FORM --- */}
      {(showAddressForm || allAddress.length === 0) && (
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-gray-100 max-w-4xl mx-auto">
          <div className="mb-10 border-b border-gray-100 pb-6">
            <h2 className="text-3xl font-serif font-light tracking-tight text-gray-900">
              {allAddress.length === 0 ? "Shipping Details" : "New Address"}
            </h2>
            <p className="text-sm text-gray-400 font-light mt-2">Please enter your exact delivery details below.</p>
          </div>

          <form onSubmit={handleAddAddress} className="space-y-8">
            
            {/* Contact Details */}
            <div className="space-y-5">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input required type="text" name="firstName" placeholder="First Name" value={address.firstName} onChange={handleInput}
                  className="w-full px-5 py-4 bg-[#FBFBFA] border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all font-light placeholder-gray-400" />
                <input required type="text" name="lastName" placeholder="Last Name" value={address.lastName} onChange={handleInput}
                  className="w-full px-5 py-4 bg-[#FBFBFA] border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all font-light placeholder-gray-400" />
                <input required type="tel" name="phoneNumber" placeholder="Phone Number" value={address.phoneNumber} onChange={handleInput}
                  className="w-full md:col-span-2 px-5 py-4 bg-[#FBFBFA] border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all font-light placeholder-gray-400" />
              </div>
            </div>

            {/* Address Details */}
            <div className="space-y-5 pt-4">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Delivery Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input required type="text" name="street1" placeholder="Street Address, P.O. Box" value={address.street1} onChange={handleInput}
                  className="w-full md:col-span-2 px-5 py-4 bg-[#FBFBFA] border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all font-light placeholder-gray-400" />
                <input type="text" name="street2" placeholder="Apartment, Suite, Unit (Optional)" value={address.street2} onChange={handleInput}
                  className="w-full md:col-span-2 px-5 py-4 bg-[#FBFBFA] border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all font-light placeholder-gray-400" />
                <input required type="text" name="city" placeholder="City" value={address.city} onChange={handleInput}
                  className="w-full px-5 py-4 bg-[#FBFBFA] border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all font-light placeholder-gray-400" />
                <input required type="text" name="state" placeholder="State / Province" value={address.state} onChange={handleInput}
                  className="w-full px-5 py-4 bg-[#FBFBFA] border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all font-light placeholder-gray-400" />
                <input required type="text" name="zipCode" placeholder="Postal Code" value={address.zipCode} onChange={handleInput}
                  className="w-full px-5 py-4 bg-[#FBFBFA] border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all font-light placeholder-gray-400" />
                <input required type="text" name="country" placeholder="Country" value={address.country} disabled onChange={handleInput}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-400 cursor-not-allowed uppercase tracking-widest text-sm font-medium" />
              </div>
            </div>

            {/* Settings */}
            <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              <div className="flex gap-3">
                {['Home', 'Work', 'Other'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleLabel(item)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full border text-[11px] font-bold uppercase tracking-widest transition-all duration-300
                      ${address.label === item
                        ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                        : 'bg-white text-gray-400 border-gray-200 hover:border-gray-400 hover:text-gray-900'
                      }`}
                  >
                    {getLabelIcon(item)} <span className="hidden sm:inline">{item}</span>
                  </button>
                ))}
              </div>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input type="checkbox" checked={address.isDefault} onChange={handleDefault}
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 transition-all checked:border-[var(--primary)] checked:bg-[var(--primary)]" />
                  <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none opacity-0 peer-checked:opacity-100 text-white" viewBox="0 0 14 10" fill="none">
                    <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-gray-900 transition-colors">
                  Set as Default
                </span>
              </label>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:flex-1 h-14 bg-gray-900 text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-sm transition-all duration-300 hover:bg-[var(--primary)] hover:shadow-xl hover:shadow-[var(--primary)]/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving Details...' : 'Save Address'}
              </button>

              {allAddress.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowAddressForm(false)}
                  className="w-full sm:w-auto px-10 h-14 bg-white border border-gray-200 text-gray-900 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:border-gray-900 hover:bg-gray-50"
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