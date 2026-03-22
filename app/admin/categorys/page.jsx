"use client"
import { base_url, img_url } from '@/app/components/urls'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaEdit, FaWindowClose, FaTrashAlt } from 'react-icons/fa'
import { FiUploadCloud } from 'react-icons/fi'
import { toast } from 'react-toastify'

const Page = () => {
    const [categoryData, setCategoryData] = useState({
        image: null,
        title: ""
    })
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const [allCategory, setAllCategory] = useState([]);

    // Get Categories
    const getCategory = async () => {
        try {
            const response = await axios.get(`${base_url}/category/get`);
            if (response.data.success) {
                setAllCategory(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching categories", error);
        }
    }

    useEffect(() => { getCategory() }, []);

    // Handle Submit (Create or Update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", categoryData.title);
            
            // Only append image if it's a new file (Object), not a string URL
            if (categoryData.image instanceof File) {
                formData.append("image", categoryData.image);
            }

            let response;
            if (isEdit) {
                response = await axios.put(`${base_url}/category/update/${editId}`, formData);
            } else {
                response = await axios.post(`${base_url}/category/create`, formData);
            }

            if (response.data.success) {
                resetForm();
                getCategory();
                toast.success(isEdit ? "Updated Successfully" : "Created Successfully");
            }
        } catch (error) {
          toast.error("Submit error", error);
        }
    }

    // Prepare for Edit
    const onEdit = (item) => {
        setIsEdit(true);
        setEditId(item._id);
        setCategoryData({
            title: item.title,
            image: item.image 
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Delete Logic
    const onDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
       const response =     await axios.delete(`${base_url}/category/delete/${id}`);
       const data = await response.data;
       if(data.success){
        toast.success(data.message)
                    getCategory();

       }else{
        toast.error(data.message)
       }
        } catch (error) {
            console.error("Delete error", error);
        }
    }

    const resetForm = () => {
        setCategoryData({ image: null, title: "" });
        setIsEdit(false);
        setEditId(null);
    }

    const getImageSource = () => {
        if (!categoryData.image) return null;
        if (categoryData.image instanceof File) {
            return URL.createObjectURL(categoryData.image);
        }
        return `${img_url}/${categoryData.image}`;
    }

    return (
        <div className='p-4  mx-auto'>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    {isEdit ? "Edit Category" : "Add New Category"}
                </h1>
                {isEdit && (
                    <button onClick={resetForm} className="text-sm text-red-500 underline">
                        Cancel Edit
                    </button>
                )}
            </div>

            {/* FORM SECTION */}
            <form onSubmit={handleSubmit} className="mb-10 p-6 bg-white rounded-xl shadow-sm border border-blue-100">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-shrink-0">
                        {categoryData?.image ? (
                            <div className="relative group w-40 h-40">
                                <img
                                    src={getImageSource()}
                                    alt="Preview"
                                    className="w-40 h-40 object-cover rounded-full border-4 border-blue-50 shadow-md"
                                />
                                <button
                                    type="button"
                                    onClick={() => setCategoryData(prev => ({ ...prev, image: null }))}
                                    className="absolute top-1 right-1 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                                >
                                    <FaWindowClose size={18} />
                                </button>
                            </div>
                        ) : (
                            <label htmlFor="image_desktop" className="w-40 h-40 rounded-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-blue-50 transition-all cursor-pointer">
                                <FiUploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                                <span className="text-[10px] font-bold uppercase text-gray-400">Upload</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="image_desktop"
                                    className="hidden"
                                    onChange={(e) => setCategoryData(prev => ({ ...prev, image: e.target.files[0] }))}
                                />
                            </label>
                        )}
                    </div>

                    <div className="flex-1 w-full space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category Title</label>
                            <input
                                type="text"
                                required
                                value={categoryData.title}
                                onChange={(e) => setCategoryData(prev => ({ ...prev, title: e.target.value }))}
                                placeholder="e.g. Electronics"
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <button type='submit' className={`w-full md:w-max px-10 py-2.5 rounded-lg font-semibold text-white transition-all active:scale-95 ${isEdit ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                            {isEdit ? "Update Category" : "Save Category"}
                        </button>
                    </div>
                </div>
            </form>

            {/* TABLE SECTION */}
            <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                <table className="w-full text-left bg-white text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-700">Image</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Title</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Slug</th>
                           <th className="px-6 py-4 font-semibold text-gray-700">Count</th>

                            <th className="px-6 py-4 text-right font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {allCategory.map((item) => (
                            <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <img src={`${img_url}/${item.image}`} className="h-12 w-12 rounded-lg object-cover border" />
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                                <td className="px-6 py-4 text-gray-500 italic">{item.slug}</td>
                                <td className="px-6 py-4 text-gray-500 italic">{item.product.length}</td>

                                <td className="px-6 py-4 text-right space-x-2">
                                    <button onClick={() => onEdit(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
                                        <FaEdit size={18} />
                                    </button>
                                    <button onClick={() => onDelete(item._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors">
                                        <FaTrashAlt size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Page