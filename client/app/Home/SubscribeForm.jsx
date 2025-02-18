import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import { Input, Spin } from "antd";
import CustomButton from "./CustomButton";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import MessageModal from "../generalcomponents/MessageModal";

const SubscribeForm = ({ register }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [isSuccess, setIsSuccess] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle form submission
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is required.");
      return;
    }

    setLoading(true);
    setMessage(""); // Clear previous messages

    try {
      const response = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        // setMessage("Successfully subscribed!");
        setMessage("Successfully subscribed!");
        setEmail(""); // Clear input
      } else {
        // setMessage(data.error || "Subscription failed.");
        setMessage(data.error || "Subscription failed.");
      }
    } catch (error) {
      // setMessage("An error occurred. Please try again.");
      console.log("An error occurred. Please try again.");
      setIsSuccess(false);

     
    } finally {
      setLoading(false);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  if (register) {
    return (
      <Stack className="partner__signup" direction={"row"} p={4}>
        <Typography fontSize={{ xs: "14px", md: "21px" }}>
          Fill out the form to register
        </Typography>
        <Link href="/">
          <CustomButton bold disabled>
            Get Started
          </CustomButton>
        </Link>
      </Stack>
    );
  } else {
    return (
      <div className="w-full bg-[#00a859] font-Geist p-5 text-[#fff] flex flex-col md:flex-row items-center justify-between mb-8 rounded-2xl gap-y-4 md:gap-y-0 md:gap-x-8 mt-4">
        <div className="w-full lg:w-[50%]">
          <h4 className="text-[26px] md:text-[26px]">
            Sign up for our Newsletter to receive news and updates.
          </h4>
        </div>
        <div className="w-full relative">
          <form
            onSubmit={handleSubscribe}
            className="w-full flex flex-col md:flex-row items-center justify-start md:justify-center gap-y-3 md:gap-y-0 md:gap-x-4"
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="w-full py-2 lg:w-[50%] placeholder:text-[#727272] outline-none"
            />
            <button
              className="relative  text-black w-full py-2 rounded-3xl md:w-[50%] lg:w-[20%] md:py-2 text-[16px] border-[1.3px] border-[#fbb12f] bg-[#FBB12F] cursor-pointer hover:bg-white hover:text-[#fbb12f] transition-all ease-in-out duration-700   font-medium group overflow-hidden"
              disabled={loading}
            >
              {/* Default Text */}
              <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-700 ease-in-out">
                {loading ? <Spin size="small" /> : "Subscribe"}
              </span>

              {/* Hover Text */}
              <span className="absolute inset-0 flex items-center justify-center text-[#fbb12f]  font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out">
                Go!
              </span>
            </button>
            <Toaster />
          </form>

          {isModalOpen && (
            <MessageModal
              message={message}
              isSuccess={isSuccess}
              onClose={closeModal}
            />
          )}
        </div>
      </div>
    );
  }
};

export default SubscribeForm;
