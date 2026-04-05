"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { FiType, FiAlignLeft, FiTag, FiFileText, FiImage, FiUploadCloud } from 'react-icons/fi';
import { base_url } from '@/app/components/urls';
import { toast } from 'react-toastify';


const Page = () => {

  const [formData, setFormData] = useState({
    title: "",
    shortdes: "",
    type: "",
    des: "",
  });

  const [image, setImage] = useState(null);

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // handle file change
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("shortdes", formData.shortdes);
      data.append("type", formData.type);
      data.append("des", formData.des);
      if (image) {
        data.append("image", image);
      }

      const res = await axios.post(`${base_url}/blog/create`, data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (res.data.success) {
        toast.success("Blog Created ✅");

        // reset form
        setFormData({
          title: "",
          shortdes: "",
          type: "",
          des: "",
        });
        setImage(null);
      }

    } catch (error) {
      console.log(error);
      toast.error("Error creating blog ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-10">

        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* Title */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-3 border rounded-xl"
          />

          {/* Short Description */}
          <input
            type="text"
            name="shortdes"
            value={formData.shortdes}
            onChange={handleChange}
            placeholder="Short Description"
            className="w-full p-3 border rounded-xl"
          />

          {/* Type */}
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Type"
            className="w-full p-3 border rounded-xl"
          />

          {/* Description */}
          <textarea
            name="des"
            value={formData.des}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-3 border rounded-xl"
          />

          {/* Image */}
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full"
          />

          {/* Button */}
          <button className="w-full bg-indigo-600 text-white py-3 rounded-xl">
            Submit
          </button>

        </form>
      </div>
    </div>
  )
}

export default Page;