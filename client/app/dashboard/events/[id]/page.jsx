"use client";

import React, { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

const EditEvent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/").pop(); // Extract blog ID from URL

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    color: "",
    startDate: "",
    endDate: "",
    title: "",
    startTime: "",
    endTime: "",
    location: "",
  });

  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        try {
          const response = await fetch(`/api/events?id=${id}`);
          const data = await response.json();
          if (response.ok) {
            setEvent(data.data);
            setFormData({
              color: data.data.color,
              startDate: data.data.startDate,
              endDate: data.data.endDate,
              title: data.data.title,
              startTime: data.data.startTime,
              endTime: data.data.endTime,
              location: data.data.location,
            });
          } else {
            console.error("Event not found:", data.message);
          }
        } catch (error) {
          console.error("Error fetching event:", error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchEvent();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/events?id=${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Event updated successfully");
        router.push("/dashboard/events"); // Redirect back to the list of events
      } else {
        toast.error("Error updating event: " + data.message);
      }
    } catch (error) {
      console.error("Error updating event:", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (!event) {
    return <div>Event not found.</div>;
  }

  return (
    <div className="w-full px-4 py-6">
      <Toaster />
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
      <h1 className="text-xl font-bold mb-4">Edit Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="block font-semibold">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="color" className="block font-semibold">
            Color
          </label>
          <input
            type="color"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="mt-1 w-16 h-10 border-none focus:ring-blue-500 cursor-pointer"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="date" className="block font-semibold">
            Date
          </label>

          <div className="flex space-x-4">
            <input
              type="date"
              name="startDate"
              id="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <span className="text-gray-600 self-center">to</span>
            <input
              type="date"
              name="endDate"
              id="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="startTime" className="block font-semibold">
            Time
          </label>
          <div className="flex space-x-4">
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <span className="text-gray-600 self-center">to</span>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="location" className="block font-semibold">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600${
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
            <p> Update Event</p>
          )}
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
