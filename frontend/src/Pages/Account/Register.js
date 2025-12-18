import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { toast } from "react-toastify";

export default function Register() {
  const generatePassword = () => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    return `AB${randomDigits}`;
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    referby: "",
    password: ""
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const backUrl = process.env.REACT_APP_BACKEND_URL;

  // Auto generate password on load
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      password: generatePassword()
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Direct Registration – No OTP
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${backUrl}/api/login`, {
        name: formData.name,
        phone: formData.phone,
        referby: formData.referby,
        password: formData.password
      });

      toast.success(response.data.message || "Registered successfully");
      navigate("/login");

    } catch (err) {
      console.error("Error registering:", err);
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('images/register.jpg')" }}
    >

      <div style={{ backgroundColor: "rgba(0,0,0,0.5)" }} className="absolute inset-0"></div>

      <div className="relative w-full max-w-md p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl">

        <div className="flex justify-center mb-6">
          <img
            src="/images/blacklogo.png"
            alt="Logo"
            className="h-20 w-auto rounded-full shadow-lg"
          />
        </div>

        <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Register
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              name="phone"
              type="text"
              placeholder="Enter mobile number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Refer Code */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Refer Number (optional)
            </label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <span className="px-3 text-gray-500">
                <FiUser size={18} />
              </span>
              <input
                name="referby"
                type="number"
                placeholder="Refer code"
                value={formData.referby}
                onChange={handleChange}
                className="w-full px-3 py-2 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password (Auto + Editable)
            </label>
            <input
              name="password"
              type="text"
              value={formData.password}
              maxLength={6}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />

            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  password: generatePassword(),
                }))
              }
              className="mt-2 px-3 py-1 bg-gray-200 bg-primary text-white rounded-lg"
            >
              Regenerate Password
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            }`}
          >
            {loading ? "Please wait..." : "Register Now"}
          </button>

          <p className="text-center text-sm mt-4 text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
