"use client";

import React, { useState } from "react";
import {
  MenuIcon,
  BellIcon,
  UserCircleIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { GrProjects } from "react-icons/gr";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import logo from "../../../public/coderinaLogo.png";
import logo1 from "../../../public/codelogo.png";
import {
  RiMenu2Fill,
  RiHome2Fill,
  RiSettings2Line,
  RiMessage2Line,
  RiRegisteredFill,
} from "react-icons/ri";
import Image from "next/image";
import { IoPartlySunnyOutline, IoPerson } from "react-icons/io5";
import { GoHome, GoPeople } from "react-icons/go";
import { BsActivity } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import { deleteCookies } from "../../lib/logout";
import { LoadingSkeleton } from "@/app/shared/Spinner";
import { CiFolderOn, CiMenuBurger } from "react-icons/ci";
import { useNotifications } from "../../context/NotificationContext";
import { useAuth } from "../../context/AuthContext";

const Layout = ({ children }) => {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { notifications } = useNotifications();
  const [showNotification, setShowNotification] = useState(false);

  const links = [
    { icon: <GoHome />, name: "Home", path: "/dashboard/overview" },
    { icon: <RiMenu2Fill />, name: "Posts", path: "/dashboard/posts" },
    // {
    //   icon: <BsActivity />,
    //   name: "Activities",
    //   path: "/dashboard/activity",
    // },
    {
      icon: <BsActivity />,
      name: "Subscribers",
      path: "/dashboard/subscribers",
    },
    {
      icon: <GrProjects />,
      name: "Couch Projects",
      path: "/dashboard/couchForm",
    },
    {
      icon: <IoPartlySunnyOutline />,
      name: "Events",
      path: "/dashboard/events",
    },
    {
      icon: <RiMessage2Line />,
      name: "Messages",
      path: "/dashboard/messages",
    },

    {
      icon: <CiFolderOn />,
      name: "Forms",
      path: "/dashboard/register",
    },
  ];

  const handleLogout = async () => {
    try {
      const response = await deleteCookies("token");
      toast.success("Logged out successfully!");
      router.push("/"); // Redirect to the login page or homepage
      setUser(null);
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="h-screen flex font-Inter w-full">
      <Toaster />
      {/* Sidebar */}
      <aside
        className={`bg-gray-200 text-gray-700 w-56 p-4 flex flex-col items-start space-y-6 ${
          showSidebar ? "absolute top-0 left-0 h-screen z-50" : "hidden md:flex"
        } md:sticky md:top-0 md:h-screen`}
      >
        <Link href="/" className="flex md:hidden lg:flex items-center mb-6">
          <Image src={logo} alt="Coderina Logo" className=" h-8 w-32" />
        </Link>
        <Link href="/" className="hidden md:flex items-center mb-6  lg:hidden">
          <Image src={logo1} alt="Coderina Logo" className=" h-6 w-32" />
        </Link>
        <ul className="space-y-4 md:pt-14">
          {links.map((link) => (
            <li
              key={link.name}
              className={`${
                pathname === link.path
                  ? "text-blue-500 font-bold"
                  : "text-gray-700"
              }`}
            >
              <Link
                href={link.path}
                className="flex items-center text-lg space-x-4"
              >
                <p>{link.icon}</p>
                <p className=" md:hidden lg:block">{link.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white text-black py-6 px-6 flex justify-between items-center sticky top-0 z-50 shadow-md">
          <div className="flex md:hidden font-bold">
            <CiMenuBurger onClick={toggleSidebar} size={20} />
          </div>

          <div className="flex">
            <h1 className="text-[15px] font-bold">Welcome</h1>

            {loading ? (
              <p>
                <LoadingSkeleton />
              </p>
            ) : user ? (
              <span className="mx-1 uppercase text-gray-500">
                {user.username ?? ""}
              </span>
            ) : (
              <p>No user data available</p>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <BellIcon
                className="h-6 w-6 cursor-pointer"
                onClick={() => setShowNotification(!showNotification)}
              />

              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                  {notifications.length}
                </span>
              )}
            </div>

            <Image
              src={user?.profilePicture ?? null}
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              width={100}
              height={100}
              alt={user?.profilePicture || "Profile Picture"}
              className="h-10 w-10 rounded-full mr-4 cursor-pointer   "
            />

            {showProfileMenu && (
              <div
                className="absolute right-6 top-14 mt-2 w-48 bg-white shadow-lg rounded-lg p-2"
                onMouseLeave={() => setShowProfileMenu(!showProfileMenu)}
              >
                <Link
                  href="/dashboard/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Profile
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Settings
                </Link>
                <button className=" w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center">
                  <LogoutIcon onClick={handleLogout} className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Notification Panel */}
        {showNotification && (
          <div className="absolute top-16 right-6 w-64 bg-white shadow-lg rounded-lg py-2 px-4 z-50">
            <h2 className="text-lg font-semibold mb-2">Notifications</h2>
            <ul>
              {notifications.length === 0 ? (
                <li className="text-gray-500">No new notifications</li>
              ) : (
                notifications.map((notif, index) => (
                  <li key={index} className="py-1 text-sm border-b">
                    {notif}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
