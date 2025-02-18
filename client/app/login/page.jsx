"use client";

import React, { useEffect, useState } from "react";
import BlogBanner1 from "../../public/look.jpg";
import BlogBanner2 from "../../public/table.jpg";
import BlogBanner3 from "../../public/arrange.jpg";
import BlogBanner4 from "../../public/focus.jpg";

import Link from "next/link";
import Image from "next/image"; // Import Image for optimization
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import codelogo from "../../public/codelogo.png";
import focus from "../../public/focus.jpg";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const banners = [BlogBanner1, BlogBanner2, BlogBanner3, BlogBanner4];
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Both email and password are required");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("api/auth/login", { email, password });
      console.log(response.data);

      const { user, message, token } = response.data;
      const userID = JSON.stringify(response.data.user.id);
      console.log(userID);

      // Store username and token locally
      sessionStorage.setItem("username", user?.username ?? "");
      sessionStorage.setItem("userId", user?.id ?? "");
      sessionStorage.setItem(
        "Greeting",
        `Welcome back ${user?.username || ""}`
      );
      sessionStorage.setItem("token", token || "");

      toast.success(message || "Welcome! You have successfully logged in");

      //   const redirectTo = searchParams.get('redirect') || '/dashboard';
      //   router.push(redirectTo);

      router.push("/dashboard/overview");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  // Function to handle manual banner selection
  const selectBanner = (index) => {
    setCurrentBannerIndex(index);
  };
  return (
    <div className="relative flex items-center justify-center md:justify-start bg-white h-screen">
      <Toaster />

      {/* slider image */}
      <div className="absolute  inset-0">
        <Image
          src={banners[currentBannerIndex]}
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>

      {/*================== Overlay content ====================*/}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-2 md:px-4">
        <form
          onSubmit={handleSubmit}
          className=" p-8 rounded-xl shadow-lg max-w-sm w-full"
        >
          <div className="flex items-center justify-center mb-7">
            <Image src={codelogo} alt="codelogo" width={40} height={40} />
          </div>
          <h2 className="text-3xl text-center text-white mb-6 font-semibold">
            Sign In
          </h2>

          {/* Email Input */}
          <div className="relative mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              required
            />
            <FaEnvelope
              className="absolute left-3 top-4 text-gray-500"
              aria-hidden="true"
            />
          </div>

          {/* Password Input */}
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-4 text-gray-500 cursor-pointer"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full p-3 bg-indigo-500 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-300 ${
              isSubmitting ? "bg-indigo-400 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <svg
                className="w-6 h-6 mx-auto animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path d="M4 12h2a8 8 0 0 1 8 8v2" />
              </svg>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>

      {/*============= Banner Indicators =============*/}
      <div className=" absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              currentBannerIndex === index ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => selectBanner(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Page;
