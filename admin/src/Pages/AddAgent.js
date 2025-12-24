import React, { useState } from "react";
import axiosInstance from "../Utils/axiosInstance";

export default function AddAgent() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosInstance.post(`/admin/add-agent`, formData);
            alert(response.data.message || "Agent added successfully");
            setFormData({ name: "", phone: "", password: "" });
        } catch (err) {
            alert(err.response?.data?.message || "Failed to add agent");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Add Agent</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input name="name" type="text" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input name="phone" type="text" value={formData.phone} onChange={handleChange} required className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input name="password" type="text" value={formData.password} onChange={handleChange} required className="w-full p-2 border rounded-lg" />
                </div>
                <button type="submit" disabled={loading} className={`w-full py-2 rounded-lg ${loading ? "bg-gray-400" : "bg-blue-600 text-white"}`}>
                    {loading ? "Please wait..." : "Add Agent"}
                </button>
            </form>
        </div>
    );
}
