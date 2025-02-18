"use client";

import Link from "next/link";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const PostEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    location: "",
    color: "#A6E5FC",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Combine startTime and endTime into a single string
    const formattedTime = formatTime(formData.startTime);
    const formattedEndTime = formatEndTime(formData.endTime);
    // Format the date to "July 27, 2021"
    const formattedDate = formatDate(formData.startDate);
    const formattedEndDate = formatEndDate(formData.endDate);

    const formattedData = {
      ...formData,
      startDate: formattedDate, // Add formatted date
      endDate: formattedEndDate, // Add formatted date
      startTime: formattedTime, // Add the formatted time to the data
      endTime: formattedEndTime, // Add the formatted time to the data
    };

    // Only include endDate if it's provided
    if (!formData.endDate) {
      delete formattedData.endDate;
    }

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData), // Send formatted data
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Event posted successfully!");
        setFormData({
          title: "",
          startDate: "",
          endDate: "",
          startTime: "",
          endTime: "",
          location: "",
          color: "#A6E5FC",
        });
      } else {
        toast.error("Failed to post event: " + data.message);
      }
    } catch (error) {
      console.error("Error posting event:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    const isPM = hour >= 12;
    const formattedHour = isPM ? hour % 12 || 12 : hour;
    const period = isPM ? "pm" : "am";
    return `${formattedHour}:${minute} ${period}`;
  };
  const formatEndTime = (timing) => {
    const [hour, minute] = timing.split(":");
    const isPM = hour >= 12;
    const formattedHour = isPM ? hour % 12 || 12 : hour;
    const period = isPM ? "pm" : "am";
    return `${formattedHour}:${minute} ${period}`;
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", options); // Format to "July 27, 2021"
  };
  const formatEndDate = (dated) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const dateObj = new Date(dated);
    return dateObj.toLocaleDateString("en-US", options); // Format to "July 27, 2021"
  };

  return (
    <div className="px-4 py-6 bg-white  lg:mx-[2.6rem] md:max-w-full max-w-md">
      <div className="flex justify-between mb-7">
        <h1 className="text-3xl font-bold text-gray-700">Events</h1>
        <div className="flex gap-3">
          {" "}
          <Link
            href="/dashboard/events"
            className=" py-2 px-3 rounded-md hover:bg-[#ccce] bg-[#EEE]"
          >
            View site
          </Link>
        </div>
      </div>

      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Toaster />
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Post a New Event
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Event Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter event title"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Date */}

            <div>
              <label
                htmlFor="startdate"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <div className="flex space-x-4">
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <span className="text-gray-600 self-center">to</span>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Time */}
            <div>
              <label
                htmlFor="startTime"
                className="block text-sm font-medium text-gray-700"
              >
                Time Range
              </label>
              <div className="flex space-x-4">
                <input
                  type="time"
                  name="startTime"
                  id="startTime"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <span className="text-gray-600 self-center">to</span>
                <input
                  type="time"
                  name="endTime"
                  id="endTime"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter event location"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Color */}
            <div>
              <label
                htmlFor="color"
                className="block text-sm font-medium text-gray-700"
              >
                Card Color
              </label>
              <input
                type="color"
                name="color"
                id="color"
                value={formData.color}
                onChange={handleInputChange}
                className="mt-1 w-16 h-10 border-none focus:ring-blue-500 cursor-pointer"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 text-white rounded-lg ${
                  loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
                } focus:ring-4 focus:ring-blue-300 focus:outline-none`}
              >
                {loading ? (
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
                  <p>Post Event</p>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostEvent;
