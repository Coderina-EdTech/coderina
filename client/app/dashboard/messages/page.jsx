"use client";

import React, { Suspense, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoPerson, IoSchool, IoTrash } from "react-icons/io5";
import { IoIosSync } from "react-icons/io"; // For loader icon
import { CiMenuKebab } from "react-icons/ci";
import { HiDownload } from "react-icons/hi";
import { FiClock, FiDatabase } from "react-icons/fi";
import { IoMail } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
const Page = () => {
  const [messages, setMessages] = useState([]);
  const [loadingId, setLoadingId] = useState(null); // Track the ID being deleted
  const [SelectedMessages, setSelectedMessages] = useState(null); // Modal state
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpenModal = (message) => {
    setSelectedMessages(message);
  };

  const handleCloseModal = () => {
    setSelectedMessages(null);
  };

  // Fetch registrations
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/contact", { method: "GET" });
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      } else {
        toast.error("Failed to fetch messages");
      }
    } catch (error) {
      toast.error("Error fetching messages");
    } finally {
      setLoading(false);
    }
  };

  // Delete registration
  const deleteMessages = async (id) => {
    try {
      setLoadingId(id); // Set loading state for the current registration
      const res = await fetch("/api/auth/contact", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("message deleted successfully");
        setMessages((prev) => prev.filter((reg) => reg._id !== id));
      } else {
        toast.error(data.message || "Failed to delete messages");
      }
    } catch (error) {
      toast.error("Error deleting messages");
    } finally {
      setLoadingId(null);
    }
  };

  // Download individual messages details
  const downloadDetails = (message) => {
    const fileName = `${message.name}_${message.email}_details.txt`;
    const details = `
      Name: ${message.name}
       Email: ${message.email}
      Subject: ${message.subject}
      message: ${message.message}
     
     
    `;

    // Create a Blob and trigger download
    const blob = new Blob([details], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Create a link and click it to download
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
  };

  // Convert registrations to CSV
  const downloadCSV = () => {
    if (messages.length === 0) {
      toast.error("No message to download");
      return;
    }

    const headers = ["Name", "Email", "Subject", "Message"];

    const rows = messages.map((msg) => [
      msg.name,
      msg.email,
      msg.message,
      msg.subject,

      new Date(msg.createdAt).toLocaleString(),
    ]);

    // Combine headers and rows into a CSV string
    const csvContent = [
      headers.join(","), // Header row
      ...rows.map((row) => row.map((field) => `"${field}"`).join(",")), // Data rows
    ].join("\n");

    // Create a Blob and a downloadable link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement("a");
    link.href = url;
    link.download = "messages.csv";
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="w-full  md:px-2 lg:px-4 py-6 overflow-hidden h-full">
      <Toaster />

      <div>
        <h1 className="text-2xl font-bold mb-4">Messages</h1>

        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        ) : messages.length === 0 ? (
          <p  className="text-center text-grey-300 py-4 h-screen">No message found</p>
        ) : (
          <div className="md:max-w-lg lg:max-w-3xl">
            <div className="mb-4 text-right font-medium">
              Total Messages: {messages.length}
            </div>

            <div className="flex justify-between items-center mb-4">
              <button
                onClick={downloadCSV}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Download CSV
              </button>
            </div>
            <div className="h-full  max-w-lg lg:max-w-3xl  bg-white">
              <table className="hidden md:block w-full border border-gray-300 text-sm text-left bg-white shadow-md rounded-md table-auto">
                <thead className=" text-white uppercase">
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">#</th>
                    <th className="border border-gray-300 p-2 text-nowrap"> Name</th>

                    <th className="border border-gray-300 p-2">Email</th>
                    <th className="border border-gray-300 p-2">Subject</th>
                    <th className="border border-gray-300 p-2">Reason</th>
                    <th className="border border-gray-300 p-2">Space Type</th>
                    <th className="border border-gray-300 p-2">Time sent</th>

<th className=" border p-2" >Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((message, index) => (
                   <tr key={message._id} className="odd:bg-gray-50 even:bg-gray-100 hover:bg-gray-200 transition">
                   <td className="p-3 text-center border border-gray-300">{index + 1}</td>
                   <td className="p-3 border border-gray-300 text-nowrap">{message.name}</td>
                   <td className="p-3 border border-gray-300">{message.email}</td>
                   <td className="p-3 border border-gray-300">{message.subject}</td>
                   <td className="p-3 border border-gray-300">{message.reason}</td>
                   <td className="p-3 border border-gray-300">{message.spaceType}</td>
                   <td className="p-3 border border-gray-300">{new Date(message.createdAt).toLocaleString()}</td>
                   <td className="p-3 border border-gray-300">


                   <div className="">
                         <div className="flex  gap-2">
                           {loadingId === message._id ? (
                             <IoIosSync className="animate-spin text-gray-500 text-xl" />
                           ) : (
                             <div className="flex items-center bg-gray-300 p-2 rounded-xl shadow-md text-red-600 cursor-pointer hover:text-red-800" onClick={() => deleteMessages(message._id)}>
                               <IoTrash /> 
                             </div>
                           )}
                           <div className="flex items-center bg-gray-300 rounded-xl shadow-md p-2 text-blue-500 cursor-pointer hover:text-blue-800" onClick={() => downloadDetails(message)}>
                             <HiDownload />
                           </div>
                           <div className="flex items-center gap-2 text-green-500 cursor-pointer hover:text-green-800 bg-gray-300 shadow-md rounded-xl p-2" onClick={() => handleOpenModal(message)}>
                           <TbListDetails /> 
                           </div>
                         </div>
                       </div>
                     {/* <CiMenuKebab className="cursor-pointer hover:text-green-600" onClick={() => setShowMenu(!showMenu)} />
                     {showMenu && (
                       <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-md p-2 z-10">
                         <div className="flex flex-col gap-2">
                           {loadingId === message._id ? (
                             <IoIosSync className="animate-spin text-gray-500 text-xl" />
                           ) : (
                             <div className="flex items-center gap-2 text-red-600 cursor-pointer hover:text-red-800" onClick={() => deleteMessages(message._id)}>
                               <IoTrash /> <span>Delete</span>
                             </div>
                           )}
                           <div className="flex items-center gap-2 text-blue-500 cursor-pointer hover:text-blue-800" onClick={() => downloadDetails(message)}>
                             <HiDownload /> <span>Download</span>
                           </div>
                           <div className="flex items-center gap-2 text-green-500 cursor-pointer hover:text-green-800" onClick={() => handleOpenModal(message)}>
                             <HiDownload /> <span>Details</span>
                           </div>
                         </div>
                       </div>
                     )} */}
                   </td>
                 </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* cards for small screen */}
            <div className="block md:hidden space-y-3">
              {messages.map((message, index) => (
                <div
                  key={message._id}
                  className="border cursor-pointer border-gray-200 p-2 rounded-lg w-[320px]"
                >
                  <div className="border cursor-pointer border-gray-200 p-2 space-y-1 rounded-lg w-[300px] hover:bg-gray-100 ">
                    <div className="flex items-center justify-start space-x-1">
                      <IoPerson />
                      <p className="">{message.name}</p>
                    </div>
                    <div className="flex items-center justify-start space-x-1">
                      <IoMail />
                      <p>{message.email}</p>
                    </div>
                    <div className="flex items-center justify-start space-x-1">
                      <IoSchool />
                      <p>{message.subject}</p>
                    </div>
                    <div className="flex items-center justify-start space-x-1">
                      <IoSchool />
                      <p>{message.reason}</p>
                    </div>
                    <div className="flex items-center justify-start space-x-1">
                      <FiClock />
                      <p> {new Date(message.createdAt).toLocaleString()}</p>
                    </div>

                    <div className="flex  items-center justify-start gap-x-3 py-3">
                      {loadingId === message._id ? (
                        <IoIosSync className="animate-spin text-gray-500 text-xl" />
                      ) : (
                        <div
                          className="flex items-center space-x-1 text-red-600 "
                          onClick={() => deleteMessages(message._id)}
                        >
                          <IoTrash className="text-red-600 hover:text-red-800 cursor-pointer text-lg" />
                        </div>
                      )}

                      <div
                        onClick={() => downloadDetails(message)}
                        className="flex items-center space-x-1 text-blue-500 "
                      >
                        <HiDownload
                          className="text-blue-500 hover:text-blue-700 cursor-pointer text-xl"
                          title="Download Details"
                        />
                      </div>

                      <div
                        onClick={() => handleOpenModal(message)}
                        className="flex items-center space-x-1 text-green-500 "
                      >
                        <FiDatabase
                          className="text-green-500 hover:text-green-700 cursor-pointer text-xl"
                          title="Download Details"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {messages.length === 0 && (
                <div>
                  <h2
                    colSpan={8}
                    className="text-center border border-gray-300 p-2"
                  >
                    No message found
                  </h2>
                </div>
              )}
            </div>

            {/* Modal */}
            {SelectedMessages && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                  <h2 className="text-lg font-bold mb-4">Meassage Details</h2>
                  <p>
                    <strong> Name:</strong> {SelectedMessages.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {SelectedMessages.email}
                  </p>
                  <p>
                    <strong>Subject:</strong> {SelectedMessages.subject}
                  </p>
                  <p>
                    <strong>Message:</strong> {SelectedMessages.message}
                  </p>

                  <p>
                    <strong>Submitted At:</strong>
                    {new Date(SelectedMessages.createdAt).toLocaleString()}
                  </p>
                  <div className="mt-4 text-right">
                    <button
                      onClick={handleCloseModal}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
