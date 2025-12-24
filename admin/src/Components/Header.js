import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Profile from './Profile';
import axiosInstance from '../Utils/axiosInstance';

import { FiMenu } from 'react-icons/fi';
import { FaUser } from "react-icons/fa";
import { FaTachometerAlt, FaUsers, FaCogs, FaGamepad } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa6";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import { FaTrophy ,FaWhatsapp } from "react-icons/fa";
import { FaPercentage } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { FaCreditCard, FaUserShield } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

const menuItems = [
  {
    title: "Dashboard",
    icon: <FaTachometerAlt />,
    link: "/public/administrator/dashboard",
  },
  {
    title: "Users",
    icon: <FaUsers />,
    children: [
      {
        title: "Add Agent",
        link: "/public/administrator/user/add-agent",
      },
      {
        title: "Add User",
        link: "/public/administrator/user/add-user",
      },
      {
        title: "View Agents",
        link: "/public/administrator/user/view-agents",
      },
      {
        title: "Active Users",
        link: "/public/administrator/user/active-user-list",
      },
      {
        title: "Inactive Users",
        link: "/public/administrator/user/inactive-user-list",
      },
      {
        title: "Today Users",
        link: "/public/administrator/user/today-user-list",
      },
    ],
  },
  {
    title: "Withdraw Management",
    icon: <FaMoneyBillWave />,
    children: [
      {
        title: "Pending",
        link: "/public/administrator/withdraw/pending",
      },
      {
        title: "Success",
        link: "/public/administrator/withdraw/approved",
      },
      {
        title: "Cancelled",
        link: "/public/administrator/withdraw/cancelled",
      },
    ],
  },
  {
    title: "Deposit Management",
    icon: <FaWallet />,
    children: [
      {
        title: "Pending",
        link: "/public/administrator/deposit/pending",
      },
      {
        title: "Success",
        link: "/public/administrator/deposit/approved",
      },
      {
        title: "Cancelled",
        link: "/public/administrator/deposit/cancelled",
      },
    ],
  },
  {
    title: "Game Load",
    icon: <FaCreditCard />,
    link: "/public/administrator/admin-game_load_list",
  },
  {
    title: "Manage Result",
    icon: <FaTrophy />,
    children: [
      {
        title: "Update Number",
        link: "/public/administrator/result/update-number",
      },
      {
        title: "Winning Number",
        link: "/public/administrator/result/winning-number",
      },
    ],
  },
  {
    title: "User Commission",
    icon: <FaPercentage />,
    children: [
      {
        title: "User Commission ",
        link: "/public/administrator/user/commission-list",
      },
      {
        title: "Commission Pay List ",
        link: "/public/administrator/user/commission-pay-list",
      },
    ],
  },
  {
    title: "Game Management",
    icon: <FaGamepad />,
    children: [
      {
        title: "Game Name List",
        link: "/public/administrator/game/game-name-list",
      },
      {
        title: "Declare Result List",
        link: "/public/administrator/game/declare-result-list",
      },
      {
        title: "Winning Report List",
        link: "/public/administrator/game/winning-report-list",
      },
    ],
  },
  {
    title: "Payment Gateway",
    icon: <FaCreditCard />,
    link: "/public/administrator/upload-qr",
  },
  {
    title: "User Reffer List",
    icon: <FaUsers />,
    link: "/public/administrator/user/user-reffer-list",
  },
  {
    title: "Edit Whatsapp",
    icon: <FaWhatsapp />,
    link: "/public/administrator/edit-whatsapp",
  },
];

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axiosInstance.get('/admin/admin-detail');
        setUserRole(response.data.user.role);
      } catch (err) {
        console.error('Error fetching user role:', err);
      }
    };
    fetchUserRole();
  }, []);

  const filteredMenuItems = menuItems.map(item => {
    if (item.title === "Users" && item.children) {
      return {
        ...item,
        children: item.children.filter(child => {
          if (userRole === 'agent' && (child.title === 'Add Agent' || child.title === 'View Agents')) {
            return false;
          }
          return true;
        })
      };
    }
    return item;
  });

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("mobile");
    localStorage.removeItem("id");
    navigate("/public/administrator/login");
    window.location.reload();
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow">
      <div className="w-full bg-gradient-to-l from-[#c31432] to-[#240b36] px-3 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FiMenu
              className="text-2xl text-white cursor-pointer"
              onClick={() => setIsSidebarOpen(true)}
            />
            <Link to={"/"} className="text-sm text-white font-semibold">Home</Link>
          </div>

          <div className="flex justify-center">
            <img
              src="/images/newlogo.png"
              alt="logo"
              className="h-16 md:h-20 w-auto max-w-none"
            />
          </div>

          <div className="flex relative items-center gap-3">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center justify-center text-white focus:outline-none"
            >
              <FaUser className="text-xl" />
            </button>

            {open && (
              <div className="absolute top-5 right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border p-2 z-50">
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/public/administrator/change-password");
                  }}
                  className="w-full text-nowrap text-left px-3 py-2 rounded hover:bg-gray-100 bg-gray-300 text-sm"
                >
                  Change Password
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-30 z-40" onClick={() => setIsSidebarOpen(false)}>

          <div
            className="absolute top-0 left-0 w-64 h-full bg-gradient-to-l from-[#c31432] to-[#240b36] z-50 shadow-md overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="profileimage relative p-4 w-full">
              <button onClick={() => setIsSidebarOpen(false)} type="button" className="absolute top-2 right-2 text-lg text-white bg-black hover:bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center">
                ×
              </button>

              <div className="flex items-center justify-between mb-4">
                <div className="profilephoto">
                  <img src="/images/newlogo.png" alt="Profile" className="h-20 w-auto" />
                </div>
              </div>

              <ul className="space-y-2 mt-2">
                {filteredMenuItems.map((item, index) => (
                  <li key={index}>
                    {item.children ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(index)}
                          className="flex items-center justify-between w-full px-3 py-2 rounded-md bg-white text-black hover:bg-gray-100"
                        >
                          <div className="flex items-center gap-2">
                            <span>{item.icon}</span>
                            <span className="text-sm">{item.title}</span>
                          </div>
                          <FaCaretDown
                            className={`transition-transform duration-100 ${openDropdown === index ? "rotate-180" : ""}`}
                          />
                        </button>

                        {openDropdown === index && (
                          <ul className="pl-8 space-y-1 mt-1">
                            {item.children.map((child, i) => (
                              <li key={i}>
                                <Link
                                  to={child.link}
                                  className="block py-2 px-3 text-sm text-white hover:bg-white hover:bg-opacity-20 rounded"
                                >
                                  {child.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        to={item.link}
                        className="flex items-center gap-2 px-3 py-2 rounded-md bg-white text-black hover:bg-gray-100"
                      >
                        <span>{item.icon}</span>
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
