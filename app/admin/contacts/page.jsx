"use client"
import { base_url } from '@/app/components/urls'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Fetch all contacts
    const fetchQuerys = async () => {
        try {
            const response = await axios.get(`${base_url}/contact/get_all`);
            // Based on your JSON, the array is in response.data.contacts
            setContacts(response.data.contacts);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    }

    // 2. Delete a contact
    const deleteContact = async (id) => {
        if (window.confirm("Are you sure you want to delete this query?")) {
            try {
                await axios.delete(`${base_url}/contact/delete/${id}`);
                // Refresh the list locally by filtering out the deleted item
                setContacts(contacts.filter(contact => contact._id !== id));
            } catch (error) {
                console.error("Error deleting contact:", error);
                alert("Failed to delete the item.");
            }
        }
    }

    useEffect(() => {
        fetchQuerys()
    }, [])

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Contact Queries</h1>
            
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Subject</th>
                            <th className="px-6 py-3">Message</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" className="text-center py-4">Loading...</td></tr>
                        ) : contacts.map((item) => (
                            <tr key={item._id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                                <td className="px-6 py-4">{item.email}</td>
                                <td className="px-6 py-4">{item.subject}</td>
                                <td className="px-6 py-4">{item.message}</td>
                                <td className="px-6 py-4">
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button 
                                        onClick={() => deleteContact(item._id)}
                                        className="cursor-pointer bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded transition"
                                    >
                                        Delete
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