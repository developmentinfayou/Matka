import axios from "axios";
import React, { useState, useEffect } from "react";
import axiosInstance from "../Utils/axiosInstance";

export default function AddUser() {
    const generatePassword = () => {
        const randomDigits = Math.floor(1000 + Math.random() * 9000); 
        return `AB${randomDigits}`;
    };

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        referby: "",
        dob: "",
        password: ""  // new password field
    });

    const [loading, setLoading] = useState(false);

    // Auto-generate password on first render
    useEffect(() => {
        setFormData((prev) => ({ ...prev, password: generatePassword() }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axiosInstance.post(`/admin/admin-add-user`, formData);

            alert(response.data.message || "User added successfully");

              // 📌 Clipboard Auto-Copy
              const textToCopy = 
              `Link: 888solution.com
              Mobile: ${formData.phone}
              Password: ${formData.password}`;

              await navigator.clipboard.writeText(textToCopy);

              alert("Copied to Clipboard:\n" + textToCopy);

            // reset form & generate new password again
            setFormData({
                name: "",
                phone: "",
                referby: "",
                dob: "",
                password: generatePassword(),
            });

        } catch (err) {
            console.error("Error adding user:", err);
            alert(err.response?.data?.message || "Failed to add user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Admin: Add User</h2>


        <div>
        <p className="text-center">Link : 888solution.com</p>

        </div>

            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        name="name"
                        type="text"
                        placeholder="Enter name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input
                        name="phone"
                        type="text"
                        placeholder="Enter mobile number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Refer By (Optional)</label>
                    <input
                        name="referby"
                        type="text"
                        placeholder="Enter refer code/number"
                        value={formData.referby}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

               

                {/* New Password Field */}
                <div>
                    <label className="block text-sm font-medium mb-1">Password (Auto + Editable)</label>
                    <input
                        name="password"
                        type="text"
                        value={formData.password}
                        onChange={handleChange}
                        maxLength={6}
                        required
                        className="w-full p-2 border rounded-lg"
                    />
                    <button
                        type="button"
                        onClick={() =>
                            setFormData((prev) => ({
                                ...prev,
                                password: generatePassword()
                            }))
                        }
                        className="mt-2 px-3 py-1 bg-gray-200 rounded-lg"
                    >
                        Regenerate Password
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded-lg transition ${
                        loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                >
                    {loading ? "Please wait..." : "Add User"}
                </button>
            </form>
        </div>
    );
}
