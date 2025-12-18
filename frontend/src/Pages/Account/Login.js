import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FiPhone, FiUser } from 'react-icons/fi';
import PWAInstallButton from '../../Components/PWAInstallButton';
import { toast } from 'react-toastify';
import DownLoadApk from '../../Components/DownloadApk';

export default function Login() {
  const [formData, setFormData] = useState({ phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const backUrl = process.env.REACT_APP_BACKEND_URL;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // LOGIN API CALL
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${backUrl}/api/login`, {
        phone: formData.phone,
        password: formData.password
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("mobile", user.mobile);
      localStorage.setItem("id", user.id);

      toast.success("Login Successful");
      window.location.href = "/";
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundImage: "url('images/register.jpg')" }} className='h-screen pt-20'>
      <div style={{ backgroundColor: "rgba(0,0,0,0.5)" }} className="absolute inset-0"></div>

      <div className="max-w-xl relative mx-auto p-6 bg-white rounded-2xl shadow-lg">
        
        <div className="border-dotted border-2 border-black text-center ring-offset-4 mb-4 mx-3 ring-4 ring-gradient-to-l from-[#c31432] to-[#240b36] text-base text-red-500 bg-white font-medium px-1 rounded-md">
          <h2>फरीदाबाद , गाजियाबाद , गली और दिसावर गेम खेलने के वाले नीचे से एप्लीकेशन डाउनलोड करे । यहां मिलता है आपको सबसे ज्यादा रेट 10 के 980 और सबसे फास्ट एंड सैफ पेमेंट ।</h2>
        </div>

        <div className="flex justify-center mb-4">
          <img src="/images/blacklogo.png" alt="Logo" className="h-20 rounded-full border-4 border-gray-200 shadow-md" />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">

          {/* PHONE NUMBER */}
          <div className="flex items-center border rounded-lg overflow-hidden">
            <span className="px-3 text-gray-500">
              <FiPhone size={18} />
            </span>
            <input
              name="phone"
              type="number"
              placeholder="Mobile Number"
              onChange={handleChange}
              required
              className="w-full p-2 outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div className="flex items-center border rounded-lg overflow-hidden">
            <span className="px-3 text-gray-500">
              <FiUser size={18} />
            </span>
            <input
              name="password"
              // type="password"
              placeholder="Enter Password"
              onChange={handleChange}
              required
              className="w-full p-2 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
          >
            {loading ? "Please wait..." : "Login"}
          </button>

        </form>

        <PWAInstallButton />

        

      </div>
    </div>
  );
}
