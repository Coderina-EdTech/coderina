"use client";

import React, { useEffect, useState } from "react";
import { IoEllipsisHorizontal, IoTrash } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import { LoadingSkeleton } from "../../shared/Spinner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DropdownButton from "../component/DropdownButton";
import { RiMenu2Fill } from "react-icons/ri";
import { SlEarphones } from "react-icons/sl";
import { IoVideocamOutline } from "react-icons/io5";
import { FiEdit, FiMessageSquare } from "react-icons/fi";
import { SlNote } from "react-icons/sl";
import { IoIosSync } from "react-icons/io";
import ConfirmationModal from "./components/ConfirmationModal";

const Page = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [showOptions, setShowOptions] = useState(null);
  const [deleting, setDeleting] = useState(null); // Track the ID being deleted
  const [isModalOpen, setIsModalOpen] = useState(false); // To toggle modal visibility
  const [eventToDelete, setEventToDelete] = useState(null); // Store event ID for deletion
  const dropdownItems = [
    { label: "Post", href: "/dashboard/postEvent", icon: RiMenu2Fill },
    { label: "Audio", href: "#", icon: SlEarphones },
    { label: "Video", href: "#", icon: IoVideocamOutline },
    { label: "Thread", href: "#", icon: FiMessageSquare },
    { label: "New note", href: "#", icon: SlNote },
  ];

  const handleToggleOptions = (id) => {
    // Toggle the options for the clicked event
    setShowOptions((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/events`);
        const data = await response.json();
        if (response.ok) {
          setEvents(data.data);
        } else {
          console.error("Failed to fetch events:", data.message);
        }
      } catch (error) {
        console.error("Error fetching events:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatTime = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const seconds = Math.floor((now - postDate) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return `${seconds} seconds ago`;
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 30) return `${days} days ago`;

    const options = { year: "numeric", month: "long", day: "numeric" };
    return postDate.toLocaleDateString(undefined, options);
  };

  const handleDelete = async (id) => {
    setDeleting(id);
    if (eventToDelete) {
      try {
        const response = await fetch(`/api/events?id=${eventToDelete}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (data.success) {
          setEvents(events.filter((event) => event._id !== eventToDelete));
        } else {
          console.error("Failed to delete event:", data.message);
        }
      } catch (error) {
        console.error("Error deleting event:", error.message);
      } finally {
        setDeleting(null); // Reset the deleting ID
        setIsModalOpen(false);
        setEventToDelete(null);
      }
    }
  };

  const handleEdit = (id) => {
    router.push(`/events/${id}`);
  };

  const handleShowModal = (id) => {
    setEventToDelete(id);
    setIsModalOpen(true); // Show modal when delete is clicked
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setEventToDelete(null); // Reset event ID on cancel
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className=" px-4 py-6 bg-white h-full lg:mx-[2.6rem] md:max-w-full max-w-md">
      <div className="flex justify-between mb-7">
        <h1 className="text-3xl font-bold text-gray-700">Events</h1>
        <div className="flex gap-3">
          {" "}
          <Link
            href="/"
            className=" py-2 px-3 rounded-md hover:bg-[#ccce] bg-[#EEE]"
          >
            View site
          </Link>
          <div className="relative inline-block text-left">
            <DropdownButton buttonText="New Event" items={dropdownItems} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        {!events.length ? (
          <div className="flex justify-center items-center h-screen">
            <p className="text-gray-600 text-lg font-semibold">
              There is no event yet.
            </p>
          </div>
        ) : (
          <div>
            {events.map((event, index) => (
              <div
                className="md:p-7 border-b border-gray-300 hover:text-white hover:bg-[rgba(72,70,70,0.93)]"
                key={index}
              >
                <div className="py-5 md:py-2 flex sm:flex-row flex-col sm:justify-between gap-10">
                  <div className="flex gap-4 items-center w-full">
                    <div className="p-1 bg-[#EEEE] rounded-md">
                      {event.color}
                    </div>
                    <div className="text-xs flex flex-col gap-2">
                      <h3 className="font-bold text-sm">{event.title}</h3>

                      <div className="flex space-x-1 items-center justify-start">
                        <div className="flex items-center gap-3">
                          <p className="uppercase font-semibold">
                            {event.startDate}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="uppercase font-semibold">
                            - {event.endDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full uppercase text-xs">
                    <div className="flex flex-col gap-2">
                      <p className="font-bold">{formatTime(event.createdAt)}</p>
                      <p>posted</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <p className="font-bold"> {event.startTime}</p>
                      <p>START Time</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <p className="font-bold">{event.endTime}</p>
                      <p>END Time</p>
                    </div>
                    <div className="p-3 border border-gray-200 rounded-lg hover:bg-[#dc7d7dee]">
                      <MdArrowOutward />
                    </div>
                    <div
                      onClick={() => handleToggleOptions(event._id)}
                      className="p-3 hover:bg-[#EEEE] hover:rounded-md"
                    >
                      <IoEllipsisHorizontal className="hover:text-green-700 text-center" />
                      {showOptions === event._id && (
                        <div className="mt-2 flex items-center justify-center">
                          <button className="p-2 text-red-500 hover:bg-red-100 rounded cursor-pointer">
                            {deleting === event._id ? (
                              <IoIosSync className="animate-spin text-gray-500 text-xl" />
                            ) : (
                              <IoTrash
                                size={22}
                                // onClick={() => handleDelete(event._id)}
                                onClick={() => handleShowModal(event._id)}
                              />
                            )}
                          </button>
                          <Link
                            href={`/dashboard/events/${event._id}`}
                            className="p-2 text-blue-500 hover:bg-blue-100 rounded mt-1"
                            //   onClick={() => handleEdit(event._id)}
                          >
                            <FiEdit size={20} />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for confirmation */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleDelete}
        onCancel={handleCancelDelete}
        message="Are you sure you want to delete this event?"
      />
    </div>
  );
};

export default Page;
